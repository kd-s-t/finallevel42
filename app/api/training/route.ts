import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { sql, db, useNeon } from '@/lib/db';
import { trainingPlan, TrainingSession } from '@/lib/training-data';

// Get all training sessions for the current user
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check if user already has sessions, only insert if missing
  let existingCount = 0;
  if (useNeon) {
    const countResult = await sql`
      SELECT COUNT(*) as count FROM training_sessions WHERE user_id = ${user.id}
    `;
    existingCount = Number(countResult[0].count);
  } else {
    const checkStmt = db.prepare('SELECT COUNT(*) as count FROM training_sessions WHERE user_id = ?');
    existingCount = (checkStmt.get(user.id) as { count: number }).count;
  }

  // Only insert if no sessions exist (first time setup)
  if (existingCount === 0) {
    if (useNeon) {
      // Batch insert for Neon - insert all sessions
      for (const session of trainingPlan) {
        await sql`
          INSERT INTO training_sessions 
          (user_id, week_number, week_range, day_name, date, time, session_type, details)
          VALUES (${user.id}, ${session.weekNumber}, ${session.weekRange}, ${session.dayName}, ${session.date}, ${session.time}, ${session.sessionType}, ${session.details})
          ON CONFLICT (user_id, week_number, day_name) DO NOTHING
        `;
      }
    } else {
      // Use INSERT OR IGNORE for SQLite to handle conflicts
      const insertStmt = db.prepare(`
        INSERT OR IGNORE INTO training_sessions 
        (user_id, week_number, week_range, day_name, date, time, session_type, details)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const insertMany = db.transaction((sessions: TrainingSession[]) => {
        for (const session of sessions) {
          insertStmt.run(
            user.id,
            session.weekNumber,
            session.weekRange,
            session.dayName,
            session.date,
            session.time,
            session.sessionType,
            session.details
          );
        }
      });

      insertMany(trainingPlan);
    }
  } else {
    // If sessions exist, only insert missing ones (for new weeks added)
    if (useNeon) {
      // Get existing session keys
      const existingSessions = await sql`
        SELECT week_number, day_name FROM training_sessions WHERE user_id = ${user.id}
      `;
      const existingKeys = new Set(
        existingSessions.map((s: any) => `${s.week_number}-${s.day_name}`)
      );

      // Only insert missing sessions
      for (const session of trainingPlan) {
        const key = `${session.weekNumber}-${session.dayName}`;
        if (!existingKeys.has(key)) {
          await sql`
            INSERT INTO training_sessions 
            (user_id, week_number, week_range, day_name, date, time, session_type, details)
            VALUES (${user.id}, ${session.weekNumber}, ${session.weekRange}, ${session.dayName}, ${session.date}, ${session.time}, ${session.sessionType}, ${session.details})
          `;
        }
      }
    } else {
      // Get existing session keys for SQLite
      const existingStmt = db.prepare('SELECT week_number, day_name FROM training_sessions WHERE user_id = ?');
      const existingSessions = existingStmt.all(user.id) as Array<{ week_number: number; day_name: string }>;
      const existingKeys = new Set(
        existingSessions.map(s => `${s.week_number}-${s.day_name}`)
      );

      // Only insert missing sessions
      const insertStmt = db.prepare(`
        INSERT INTO training_sessions 
        (user_id, week_number, week_range, day_name, date, time, session_type, details)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      for (const session of trainingPlan) {
        const key = `${session.weekNumber}-${session.dayName}`;
        if (!existingKeys.has(key)) {
          insertStmt.run(
            user.id,
            session.weekNumber,
            session.weekRange,
            session.dayName,
            session.date,
            session.time,
            session.sessionType,
            session.details
          );
        }
      }
    }
  }

  // Get all sessions for the user
  let sessions: Array<{
    week_number: number;
    week_range: string;
    day_name: string;
    date: string;
    time: string;
    session_type: string;
    details: string;
    completed: boolean | number;
    completed_at: string | null;
  }>;

  if (useNeon) {
    const result = await sql`
      SELECT week_number, week_range, day_name, date, time, session_type, details, completed, completed_at
      FROM training_sessions
      WHERE user_id = ${user.id}
      ORDER BY week_number, 
        CASE day_name
          WHEN 'Mon' THEN 1
          WHEN 'Tue' THEN 2
          WHEN 'Wed' THEN 3
          WHEN 'Thu' THEN 4
          WHEN 'Fri' THEN 5
          WHEN 'Sat' THEN 6
          WHEN 'Sun' THEN 7
        END
    `;
    sessions = result.map((s: any) => ({
      ...s,
      completed: s.completed ? 1 : 0, // Convert boolean to number for consistency
    }));
  } else {
    const stmt = db.prepare(`
      SELECT week_number, week_range, day_name, date, time, session_type, details, completed, completed_at
      FROM training_sessions
      WHERE user_id = ?
      ORDER BY week_number, 
        CASE day_name
          WHEN 'Mon' THEN 1
          WHEN 'Tue' THEN 2
          WHEN 'Wed' THEN 3
          WHEN 'Thu' THEN 4
          WHEN 'Fri' THEN 5
          WHEN 'Sat' THEN 6
          WHEN 'Sun' THEN 7
        END
    `);

    sessions = stmt.all(user.id) as Array<{
      week_number: number;
      week_range: string;
      day_name: string;
      date: string;
      time: string;
      session_type: string;
      details: string;
      completed: number;
      completed_at: string | null;
    }>;
  }

  return NextResponse.json({ sessions });
}

// Update training session completion status
export async function PATCH(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { weekNumber, dayName, completed } = await request.json();

  if (weekNumber === undefined || !dayName || completed === undefined) {
    return NextResponse.json(
      { error: 'weekNumber, dayName, and completed are required' },
      { status: 400 }
    );
  }

  if (useNeon) {
    await sql`
      UPDATE training_sessions
      SET completed = ${completed ? true : false}, completed_at = ${completed ? new Date().toISOString() : null}
      WHERE user_id = ${user.id} AND week_number = ${weekNumber} AND day_name = ${dayName}
    `;
  } else {
    const stmt = db.prepare(`
      UPDATE training_sessions
      SET completed = ?, completed_at = ?
      WHERE user_id = ? AND week_number = ? AND day_name = ?
    `);

    stmt.run(
      completed ? 1 : 0,
      completed ? new Date().toISOString() : null,
      user.id,
      weekNumber,
      dayName
    );
  }

  return NextResponse.json({ success: true });
}
