import bcrypt from 'bcryptjs';
import db from './db';
import { cookies } from 'next/headers';

export interface User {
  id: number;
  username: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createUser(username: string, password: string): Promise<User> {
  const hashedPassword = await hashPassword(password);
  const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
  const result = stmt.run(username, hashedPassword);
  return { id: Number(result.lastInsertRowid), username };
}

export async function getUserByUsername(username: string): Promise<User & { password: string } | null> {
  const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
  const user = stmt.get(username) as (User & { password: string }) | undefined;
  return user || null;
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

  const stmt = db.prepare('SELECT id, username FROM users WHERE id = ?');
  const user = stmt.get(Number(userId)) as User | undefined;
  return user || null;
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
