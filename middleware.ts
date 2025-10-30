import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { WeddingInfo } from './src/types/wedding';

export const config = { matcher: '/:path*' };

const env = (k: string) => {
  const v = process.env[k];
  if (!v) throw new Error(`Missing env: ${k}`);
  return v;
};

const FIREBASE_BASE = `https://${env('FIREBASE_PROJECT_ID')}.firebaseio.com`;
const BOT_PATTERN =
  /(facebook|twitter|linkedin|bot|crawl|spider|slack|embed|kakaotalk)/i;

const middleware = async (req: NextRequest) => {
  const path = req.nextUrl.pathname.replace(/^\//, '');
  if (!path || path.startsWith('api') || path.includes('.'))
    return NextResponse.next();

  const shareId = path;
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? env('PUBLIC_BASE_URL')
      : 'http://localhost:3000';

  try {
    const snap = await fetch(`${FIREBASE_BASE}/shares/${shareId}/data.json`);
    if (!snap.ok) return NextResponse.next();

    const data = (await snap.json()) as WeddingInfo | null;
    if (!data?.intro || !data?.date) return NextResponse.next();

    const { date, intro, gallery } = data;
    const { maleName, femaleName } = intro.basicInfo;
    const img = gallery.savedImageList?.[0] || `${baseUrl}/og-image.png`;

    const title = `${maleName} ❤️ ${femaleName} 결혼합니다!`;
    const desc = `${date.year}년 ${date.month}월 ${date.day}일 결혼식에 초대합니다.`;
    const ua = req.headers.get('user-agent') || '';

    if (BOT_PATTERN.test(ua)) {
      const html = `
<!DOCTYPE html><html lang="ko"><head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
<meta property="og:image" content="${img}" />
<meta property="og:url" content="${baseUrl}/${shareId}" />
<meta property="og:type" content="website" />
<meta http-equiv="refresh" content="0; url=${baseUrl}/${shareId}" />
</head><body></body></html>`;
      return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }
  } catch (e) {
    console.error('MIDDLEWARE_ERROR', e);
  }

  return NextResponse.next();
};

export default middleware;
