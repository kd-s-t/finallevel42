import { NextRequest, NextResponse } from 'next/server';
import { login, createUser, setSession, getUserByUsername } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password, action } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    if (action === 'register') {
      // Check if user already exists
      const existingUser = await getUserByUsername(username);
      if (existingUser) {
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 400 }
        );
      }

      const user = await createUser(username, password);
      await setSession(user.id);
      return NextResponse.json({ success: true, user });
    } else {
      const user = await login(username, password);
      if (!user) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      await setSession(user.id);
      return NextResponse.json({ success: true, user });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Authentication failed' },
      { status: 500 }
    );
  }
}
