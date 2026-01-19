import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import db from '@/lib/db';
import { trainingPlan, TrainingSession } from '@/lib/training-data';

// Get all training sessions for the current user
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Initialize training sessions if they don't exist
  const checkStmt = db.prepare('SELECT COUNT(*) as count FROM training_sessions WHERE user_id = ?');
  const count = (checkStmt.get(user.id) as { count: number }).count;

  if (count === 0) {
    // Insert all training sessions
    const insertStmt = db.prepare(`
      INSERT INTO training_sessions 
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

  // Get all sessions for the user
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

  const sessions = stmt.all(user.id) as Array<{
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

  return NextResponse.json({ success: true });
}
