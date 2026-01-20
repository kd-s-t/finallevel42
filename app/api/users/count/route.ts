import { NextResponse } from 'next/server';
import { sql, db, useNeon } from '@/lib/db';

export async function GET() {
  try {
    let count = 0;
    
    if (useNeon) {
      const result = await sql`
        SELECT COUNT(*) as count FROM users
      `;
      count = Number(result[0].count);
    } else {
      const stmt = db.prepare('SELECT COUNT(*) as count FROM users');
      const result = stmt.get() as { count: number };
      count = result.count;
    }

    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error fetching user count:', error);
    return NextResponse.json({ error: 'Failed to fetch user count' }, { status: 500 });
  }
}
