export const config = { runtime: 'edge' };

function getEnv(key, fallback = '') {
  try {
    const val = (process && process.env && process.env[key]) || '';
    return typeof val === 'string' && val.length > 0 ? val : fallback;
  } catch {
    return fallback;
  }
}

const FIREBASE_BASE = getEnv('FIREBASE_DATABASE_URL');
const BASE_URL =
  process?.env?.NODE_ENV === 'production'
    ? getEnv('PUBLIC_BASE_URL')
    : 'http://localhost:3000';

const BOT_PATTERN =
  /(facebook|twitter|linkedin|bot|crawl|spider|slack|embed|kakaotalk)/i;

export default async function handler(req) {
  const start = Date.now();

  try {
    const url = new URL(req.url);
    const paths = url.pathname.split('/').filter(Boolean);
    const shareId = paths.pop() || '';

    console.log('[OG] 🔹 Incoming Request', {
      fullUrl: req.url,
      pathname: url.pathname,
      shareId,
      ua: req.headers.get('user-agent') || '(none)',
    });

    if (!shareId) {
      console.warn('[OG] ⚠️ Missing shareId');
      return fetch(`${BASE_URL}/index.html`);
    }

    const ua = req.headers.get('user-agent') || '';
    const isBot = BOT_PATTERN.test(ua);
    console.log(`[OG] 🤖 Is bot: ${isBot}`);

    if (!isBot) {
      return fetch(`${BASE_URL}/index.html`, { cache: 'no-store' });
    }

    if (!FIREBASE_BASE) {
      console.error('[OG] ❌ FIREBASE_DATABASE_URL missing');
      return fetch(`${BASE_URL}/index.html`);
    }

    const dataUrl = `${FIREBASE_BASE}/shares/${shareId}/data.json`;
    console.log('[OG] 🔍 Fetching:', dataUrl);

    const snap = await fetch(dataUrl, { cache: 'no-store' });
    if (!snap.ok) {
      console.error('[OG] ❌ Firebase fetch failed:', snap.status);
      return fetch(`${BASE_URL}/index.html`);
    }

    let data = null;
    try {
      data = await snap.json();
    } catch {
      console.error('[OG] ❌ JSON parse error');
      return fetch(`${BASE_URL}/index.html`);
    }

    if (!data || !data.intro || !data.date) {
      console.warn('[OG] ⚠️ Incomplete or invalid data');
      return fetch(`${BASE_URL}/index.html`);
    }

    const intro = data.intro || {};
    const date = data.date || {};
    const gallery = data.gallery || {};
    const basic = intro.basicInfo || {};

    const maleName = basic.maleName || '신랑';
    const femaleName = basic.femaleName || '신부';
    const title = `${maleName} ❤️ ${femaleName} 결혼합니다!`;
    const desc = `${date.year ?? ''}년 ${date.month ?? ''}월 ${date.day ?? ''}일 결혼식에 초대합니다.`;

    let img = '/og-image.png';
    const list = gallery.savedImageList;
    if (Array.isArray(list) && list.length > 0) {
      const first = list[0];
      img = first.startsWith('http') ? first : `${BASE_URL}${first}`;
    } else {
      img = `${BASE_URL}/og-image.png`;
    }

    console.log('[OG] ✅ Meta generated', { title, desc, img });

    const html = `<!doctype html><html lang="ko"><head>
<meta charset="utf-8" />
<title>${title}</title>
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
<meta property="og:image" content="${img}" />
<meta property="og:url" content="${BASE_URL}/${shareId}" />
<meta http-equiv="refresh" content="0; url=${BASE_URL}/${shareId}" />
</head></html>`;

    console.log(`[OG] 🕓 Done in ${Date.now() - start}ms`);

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
