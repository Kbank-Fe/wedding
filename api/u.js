const BOT_PATTERN =
  /(facebookexternalhit|twitterbot|slackbot|discordbot|kakaotalk|kakaostory|msteams|teams|bot|crawl|spider|embed)/i;

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

export default async function handler(req, res) {
  try {
    const { shareId } = req.query;
    const ua = req.headers['user-agent'] || '';
    const BASE_URL = getBaseUrl().replace(/^http:/, 'https:');
    const isTeams = /msteams|teams/i.test(ua);

    if (!shareId) {
      res.status(302).setHeader('Location', BASE_URL).end();
      return;
    }

    if (!BOT_PATTERN.test(ua)) {
      res.status(302).setHeader('Location', `${BASE_URL}/${shareId}`).end();
      return;
    }

    const FIREBASE_BASE = required('FIREBASE_DATABASE_URL');

    const dataRes = await fetch(
      `${FIREBASE_BASE}/shares/${shareId}/data.json`,
      { cache: 'no-store' },
    );

    const data = safeParseJSON(await dataRes.text());
    if (!dataRes.ok || !data) {
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
    if (typeof imageUrl === 'string' && imageUrl.startsWith('http')) {
      img = imageUrl;
    }

    const redirectMeta = isTeams
      ? ''
      : `<meta http-equiv="refresh" content="0; url=${BASE_URL}/${shareId}" />`;

    res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(`<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<title>${title}</title>
<meta property="og:type" content="website" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
<meta property="og:image" content="${img}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="${BASE_URL}/u/${shareId}" />
<meta name="twitter:card" content="summary_large_image" />
${redirectMeta}
</head>
</html>`);
  } catch {
    res.status(302).setHeader('Location', process.env.PUBLIC_BASE_URL).end();
  }
}
