export const config = {
  runtime: 'edge',
};

const FIREBASE_BASE = process.env.FIREBASE_DATABASE_URL!;
const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.PUBLIC_BASE_URL!
    : 'http://localhost:3000';

const BOT_PATTERN =
  /(facebook|twitter|linkedin|bot|crawl|spider|slack|embed|kakaotalk)/i;

export default async function handler(req: Request) {
  try {
    const url = new URL(req.url);
    const shareId = url.pathname.replace('/', '');
    if (!shareId) {
      return fetch(`${BASE_URL}/index.html`);
    }

    const ua = req.headers.get('user-agent') || '';
    const isBot = BOT_PATTERN.test(ua);

    if (!isBot) {
      return fetch(`${BASE_URL}/index.html`);
    }

    const snap = await fetch(`${FIREBASE_BASE}/shares/${shareId}/data.json`);
    if (!snap.ok) return fetch(`${BASE_URL}/index.html`);
    const data = await snap.json();
    if (!data?.intro || !data?.date) return fetch(`${BASE_URL}/index.html`);

    const { date, intro, gallery } = data;
    const { maleName, femaleName } = intro.basicInfo;
    const img = gallery?.savedImageList?.[0] ?? `${BASE_URL}/og-image.png`;

    const title = `${maleName} ❤️ ${femaleName} 결혼합니다!`;
    const desc = `${date.year}년 ${date.month}월 ${date.day}일 결혼식에 초대합니다.`;

    const html = `
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
<meta property="og:image" content="${img}" />
<meta property="og:url" content="${BASE_URL}/${shareId}" />
<meta property="og:type" content="website" />
<meta http-equiv="refresh" content="0; url=${BASE_URL}/${shareId}" />
</head>
<body></body>
</html>`;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (err) {
    console.error('EDGE_ERROR', err);
    return fetch(`${BASE_URL}/index.html`);
  }
}
