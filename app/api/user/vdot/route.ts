import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { sql, db, useNeon } from '@/lib/db';

// Get user's VDOT
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (useNeon) {
      const result = await sql`
        SELECT vdot FROM users WHERE id = ${user.id}
      `;
      return NextResponse.json({ vdot: result[0]?.vdot || null });
    } else {
      const stmt = db.prepare('SELECT vdot FROM users WHERE id = ?');
      const result = stmt.get(user.id) as { vdot: number | null } | undefined;
      return NextResponse.json({ vdot: result?.vdot || null });
    }
  } catch (error) {
    console.error('Error fetching VDOT:', error);
    return NextResponse.json(
      { error: 'Failed to fetch VDOT' },
      { status: 500 }
    );
  }
}

// Update user's VDOT
export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { vdot } = await request.json();

    if (vdot === undefined || vdot === null) {
      return NextResponse.json(
        { error: 'VDOT is required' },
        { status: 400 }
      );
    }

    if (typeof vdot !== 'number' || vdot < 0 || vdot > 100) {
      return NextResponse.json(
        { error: 'VDOT must be a number between 0 and 100' },
        { status: 400 }
      );
    }

    if (useNeon) {
      await sql`
        UPDATE users SET vdot = ${vdot} WHERE id = ${user.id}
      `;
    } else {
      const stmt = db.prepare('UPDATE users SET vdot = ? WHERE id = ?');
      stmt.run(vdot, user.id);
    }

    return NextResponse.json({ success: true, vdot });
  } catch (error) {
    console.error('Error updating VDOT:', error);
    return NextResponse.json(
      { error: 'Failed to update VDOT' },
      { status: 500 }
    );
  }
}
