const BOT_PATTERN =
  /(facebookexternalhit|twitterbot|slackbot|discordbot|bot|crawl|spider|embed)/i;

const TEAMS_PATTERN = /(msteams|teams)/i;

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
    const shareIdRaw = String(req.query.shareId || '');
    const shareId = encodeURIComponent(shareIdRaw);
    const ua = String(req.headers['user-agent'] || '');

    const isBot = BOT_PATTERN.test(ua);
    const isTeams = TEAMS_PATTERN.test(ua);

    if (!shareIdRaw) {
      res.status(302).setHeader('Location', BASE_URL).end();
      return;
    }

    const landingUrl = `${BASE_URL}/${shareId}`;

    if (!isBot) {
      res.status(302).setHeader('Location', landingUrl).end();
      return;
    }

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
      img = imageUrl;

    const redirectMeta = isTeams
      ? ''
      : `<meta http-equiv="refresh" content="0; url=${esc(landingUrl)}" />`;

    res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8');
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
<meta property="og:url" content="${esc(`${BASE_URL}/u/${shareId}`)}" />
<meta name="twitter:card" content="summary_large_image" />
${redirectMeta}
</head>
<body></body>
</html>`);
  } catch {
    res.status(302).setHeader('Location', BASE_URL).end();
  }
}
