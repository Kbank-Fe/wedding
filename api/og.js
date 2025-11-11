export const config = { runtime: 'edge' };

const FIREBASE_BASE = process.env.FIREBASE_DATABASE_URL;
const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.PUBLIC_BASE_URL
    : 'http://localhost:3000';

const BOT_PATTERN =
  /(facebook|twitter|linkedin|bot|crawl|spider|slack|embed|kakaotalk|kakaostory|whatsapp|telegram|discord)/i;

export default async function handler(req) {
  try {
    const url = new URL(req.url);
    const shareId = url.pathname.replace(/^\/api\/og\//, '').replace(/^\//, '');

    console.log(`[OG] ▶ Request start | shareId=${shareId}`);

    if (!shareId) {
      console.warn('[OG] ⚠ Missing shareId → index.html');
      return fetch(`${BASE_URL}/index.html`);
    }

    const ua = req.headers.get('user-agent') || '';
    const isBot = BOT_PATTERN.test(ua);
    console.log(`[OG] UA: ${ua.slice(0, 80)}... | isBot=${isBot}`);

    if (!isBot) {
      console.log('[OG] Normal user → forward to SPA');
      return fetch(`${BASE_URL}/index.html`, { cache: 'no-store' });
    }

    if (!FIREBASE_BASE) {
      console.error('[OG] ❌ Missing FIREBASE_DATABASE_URL');
      return fetch(`${BASE_URL}/index.html`);
    }

    const dataUrl = `${FIREBASE_BASE}/shares/${shareId}/data.json`;
    console.log(`[OG] 🔍 Fetching Firebase data: ${dataUrl}`);

    const snap = await fetch(dataUrl, { cache: 'no-store' });
    if (!snap.ok) {
      console.error(`[OG] ❌ Firebase fetch failed | status=${snap.status}`);
      return fetch(`${BASE_URL}/index.html`);
    }

    let data;
    try {
      data = await snap.json();
    } catch {
      console.error('[OG] ❌ JSON parse error');
      return fetch(`${BASE_URL}/index.html`);
    }

    if (!data?.intro || !data?.date) {
      console.warn('[OG] ⚠ Incomplete data → index.html');
      return fetch(`${BASE_URL}/index.html`);
    }

    const date = data.date || {};
    const gallery = data.gallery || {};
    const basic = data.basicInfo || {};

    const maleName = basic.maleName || '신랑';
    const femaleName = basic.femaleName || '신부';
    const title = `${maleName} ❤️ ${femaleName} 결혼합니다!`;
    const desc = `${date.year ?? ''}년 ${date.month ?? ''}월 ${date.day ?? ''}일 결혼식에 초대합니다.`;

    let img = `${BASE_URL}/og-image.png`;
    const list = gallery.savedImageList;
    if (Array.isArray(list) && list.length > 0) {
      const first = list[0];
      img = first.startsWith('http') ? first : `${BASE_URL}${first}`;
    }

    console.log(`[OG] ✅ Meta generated | title="${title}" | img=${img}`);

    const html = `<!doctype html><html lang="ko"><head>
<meta charset="utf-8" />
<title>${title}</title>
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
<meta property="og:image" content="${img}" />
<meta property="og:url" content="${BASE_URL}/${shareId}" />
<meta http-equiv="refresh" content="0; url=${BASE_URL}/${shareId}" />
</head></html>`;

    console.log('[OG] ▶ Request end (success)');
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Vary: 'User-Agent',
      },
    });
  } catch (err) {
    console.error('[OG] ❗ Unexpected error', err);
    return fetch(`${BASE_URL}/index.html`, { cache: 'no-store' });
  }
}
