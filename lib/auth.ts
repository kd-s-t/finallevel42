import bcrypt from 'bcryptjs';
import { sql, db, useNeon } from './db';
import { cookies } from 'next/headers';

export interface User {
  id: number;
  username: string;
  vdot?: number | null;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createUser(username: string, password: string): Promise<User> {
  const hashedPassword = await hashPassword(password);
  
  if (useNeon) {
    const result = await sql`
      INSERT INTO users (username, password) 
      VALUES (${username}, ${hashedPassword}) 
      RETURNING id, username
    `;
    return { id: result[0].id, username: result[0].username };
  } else {
    const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    const result = stmt.run(username, hashedPassword);
    return { id: Number(result.lastInsertRowid), username };
  }
}

export async function getUserByUsername(username: string): Promise<User & { password: string } | null> {
  if (useNeon) {
    const result = await sql`
      SELECT * FROM users WHERE username = ${username}
    `;
    return result[0] || null;
  } else {
    const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
    const user = stmt.get(username) as (User & { password: string }) | undefined;
    return user || null;
  }
}

export async function login(username: string, password: string): Promise<User | null> {
  const user = await getUserByUsername(username);
  if (!user) return null;

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) return null;

  return { id: user.id, username: user.username };
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const userId = cookieStore.get('user_id')?.value;
  
  if (!userId) return null;

  if (useNeon) {
    const result = await sql`
      SELECT id, username, vdot FROM users WHERE id = ${Number(userId)}
    `;
    return result[0] ? { id: result[0].id, username: result[0].username, vdot: result[0].vdot } : null;
  } else {
    const stmt = db.prepare('SELECT id, username, vdot FROM users WHERE id = ?');
    const user = stmt.get(Number(userId)) as (User & { vdot: number | null }) | undefined;
    return user ? { id: user.id, username: user.username, vdot: user.vdot } : null;
  }
}

export async function setSession(userId: number) {
  const cookieStore = await cookies();
  cookieStore.set('user_id', userId.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete('user_id');
}
