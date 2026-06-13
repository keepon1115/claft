import { createHash, randomUUID } from 'node:crypto';
import type { NextRequest, NextResponse } from 'next/server';

/**
 * リアクションの「1人1回」を実現するための匿名訪問者ID。
 * httpOnly クッキーにランダムUUIDを置き、DBにはそのSHA-256ハッシュだけを保存する。
 * PII は含まれず、集計（RPC）はハッシュすら返さない。
 */
export const VISITOR_COOKIE = 'ndj_vid';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1年

export function getOrCreateVisitorId(req: NextRequest): { id: string; isNew: boolean } {
  const existing = req.cookies.get(VISITOR_COOKIE)?.value;
  if (existing && /^[0-9a-f-]{36}$/i.test(existing)) {
    return { id: existing, isNew: false };
  }
  return { id: randomUUID(), isNew: true };
}

export function setVisitorCookie(res: NextResponse, id: string): void {
  res.cookies.set(VISITOR_COOKIE, id, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
}

export function hashVisitorId(id: string): string {
  return createHash('sha256').update(id).digest('hex');
}
