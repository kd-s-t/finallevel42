import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { sql, db, useNeon } from '@/lib/db';

export async function GET() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let users: Array<{
      id: number;
      username: string;
      totalSessions: number;
      completedSessions: number;
      progressPercentage: number;
    }>;

    if (useNeon) {
      const result = await sql`
        SELECT 
          u.id,
          u.username,
          COUNT(ts.id) as total_sessions,
          COUNT(CASE WHEN ts.completed = true THEN 1 END) as completed_sessions
        FROM users u
        LEFT JOIN training_sessions ts ON u.id = ts.user_id
        GROUP BY u.id, u.username
        ORDER BY u.username ASC
      `;

      users = result.map((row: any) => {
        const total = Number(row.total_sessions) || 0;
        const completed = Number(row.completed_sessions) || 0;
        return {
          id: row.id,
          username: row.username,
          totalSessions: total,
          completedSessions: completed,
          progressPercentage: total > 0 ? Math.round((completed / total) * 100) : 0,
        };
      });
    } else {
      const stmt = db.prepare(`
        SELECT 
          u.id,
          u.username,
          COUNT(ts.id) as total_sessions,
          COUNT(CASE WHEN ts.completed = 1 THEN 1 END) as completed_sessions
        FROM users u
        LEFT JOIN training_sessions ts ON u.id = ts.user_id
        GROUP BY u.id, u.username
        ORDER BY u.username ASC
      `);

      const result = stmt.all() as Array<{
        id: number;
        username: string;
        total_sessions: number;
        completed_sessions: number;
      }>;

      users = result.map((row) => {
        const total = row.total_sessions || 0;
        const completed = row.completed_sessions || 0;
        return {
          id: row.id,
          username: row.username,
          totalSessions: total,
          completedSessions: completed,
          progressPercentage: total > 0 ? Math.round((completed / total) * 100) : 0,
        };
      });
    }

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user progress' },
      { status: 500 }
    );
  }
}
