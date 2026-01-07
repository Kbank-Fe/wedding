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

const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

export default async function handler(req, res) {
  const BASE_URL = getBaseUrl().replace(/^http:/, 'https:');

  try {
    const shareId = String(req.query.shareId || '').trim();
    if (!shareId) {
      res.status(302).setHeader('Location', BASE_URL).end();
      return;
    }

    const landingUrl = `${BASE_URL}/${shareId}`;
    const ogUrl = `${BASE_URL}/u/${shareId}`;

    const FIREBASE_BASE = required('FIREBASE_DATABASE_URL');
    const dataRes = await fetch(
      `${FIREBASE_BASE}/shares/${shareId}/data.json`,
      { cache: 'no-store' },
    );

    const data = safeParseJSON(await dataRes.text());
    if (!dataRes.ok || !data) {
      res.status(302).setHeader('Location', landingUrl).end();
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
      img = `${BASE_URL}/api/og?src=${encodeURIComponent(imageUrl)}`;

    res.status(200);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.setHeader('Vary', 'User-Agent');

    res.send(`<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<title>${esc(title)}</title>

<meta property="og:type" content="website" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(desc)}" />
<meta property="og:image" content="${esc(img)}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="${esc(ogUrl)}" />
<meta name="twitter:card" content="summary_large_image" />

<script>
  if (!/bot|crawl|spider|facebook|twitter|slack|discord|preview|msteams/i.test(navigator.userAgent)) {
    location.replace(${JSON.stringify(landingUrl)});
  }
</script>
</head>
<body></body>
</html>`);
  } catch {
    res.status(302).setHeader('Location', BASE_URL).end();
  }
}
