import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ipRateLimitMap = new Map<string, { count: number; timestamp: number }>();

export function middleware(req: NextRequest) {
  const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const limitWindow = 20 * 60 * 1000; // 20 * 1 minute
  const limit = 20 * 120; // 20 * 120 requests per minute

  const record = ipRateLimitMap.get(ip);

  if (!record || now - record.timestamp > limitWindow) {
    ipRateLimitMap.set(ip, { count: 1, timestamp: now });
  } else {
    record.count += 1;
    if (record.count > limit) {
      return new NextResponse('Too many requests', { status: 429 });
    }
  }

  console.log('middleware', ip, record);

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/(.*)',
}