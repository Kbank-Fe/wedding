const BOT_PATTERN =
  /(facebookexternalhit|twitterbot|slackbot|discordbot|kakaotalk|kakaostory|bot|crawl|spider|embed)/i;

const required = (name) => {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
};

const getBaseUrl = () =>
  process.env.NODE_ENV === 'production'
    ? required('PUBLIC_BASE_URL')
    : 'http://localhost:3000';

const safeParseJSON = (t) => {
  try {
    return JSON.parse(t);
  } catch {
    return null;
  }
};

const log = (type, payload = {}) => {
  console.log(JSON.stringify({ type, ...payload }));
};

/**
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
export default async function handler(req, res) {
  const startedAt = Date.now();

  try {
    const { shareId } = req.query;
    const ua = req.headers['user-agent'] || '';
    const BASE_URL = getBaseUrl();

    log('U_API_ENTER', {
      shareId,
      ua,
      path: req.url,
    });

    if (!shareId) {
      log('U_API_NO_SHARE_ID');
      res.status(302).setHeader('Location', BASE_URL).end();
      return;
    }

    if (!BOT_PATTERN.test(ua)) {
      log('U_API_USER_REDIRECT', { shareId });
      res.status(302).setHeader('Location', `${BASE_URL}/${shareId}`).end();
      return;
    }

    required('FIREBASE_DATABASE_URL');
    const FIREBASE_BASE = process.env.FIREBASE_DATABASE_URL;

    const fetchUrl = `${FIREBASE_BASE}/shares/${shareId}/data.json`;
    log('U_API_FETCH_START', { fetchUrl });

    const dataRes = await fetch(fetchUrl, { cache: 'no-store' });
    const dataText = await dataRes.text();
    const data = safeParseJSON(dataText);

    log('U_API_FETCH_RESULT', {
      ok: dataRes.ok,
      status: dataRes.status,
      hasData: !!data,
    });

    if (!dataRes.ok || !data) {
      log('U_API_FETCH_FAIL', { shareId });
      res.status(302).setHeader('Location', `${BASE_URL}/${shareId}`).end();
      return;
    }

    const male = data?.basicInfo?.maleName || '신랑';
    const female = data?.basicInfo?.femaleName || '신부';
    const date = data?.date || {};

    const title = `${male} ❤️ ${female} 결혼합니다!`;
    const desc = `${date.year ?? ''}년 ${date.month ?? ''}월 ${date.day ?? ''}일 결혼식에 초대합니다.`;

    let img = `${BASE_URL}/og-image.png`;
    const imageUrl = data?.share?.savedImageList?.[0]?.url;
    if (typeof imageUrl === 'string' && imageUrl.startsWith('http'))
      img = imageUrl;

    log('U_API_OG_READY', {
      shareId,
      title,
      img,
      elapsed: Date.now() - startedAt,
    });

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Vary', 'User-Agent');

    res.status(200).send(`<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<title>${title}</title>
<meta property="og:type" content="website" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
<meta property="og:image" content="${img}" />
<meta property="og:url" content="${BASE_URL}/${shareId}" />
<meta name="twitter:card" content="summary_large_image" />
<meta http-equiv="refresh" content="0; url=${BASE_URL}/${shareId}" />
</head>
</html>`);
  } catch (e) {
    log('U_API_ERROR', {
      name: e?.name,
      message: e?.message,
      stack: e?.stack,
    });

    const fallback = process.env.PUBLIC_BASE_URL || 'http://localhost:3000';
    res.status(302).setHeader('Location', fallback).end();
  }
}
