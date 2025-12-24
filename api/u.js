const BOT_PATTERN =
  /(facebook|twitter|linkedin|bot|crawl|spider|slack|embed|kakaotalk|kakaostory|whatsapp|telegram|discord)/i;

const required = (name) => {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
};

const getBaseUrl = () =>
  process.env.NODE_ENV === 'production'
    ? required('PUBLIC_BASE_URL')
    : 'http://localhost:3000';

export default async function handler(req, res) {
  try {
    const { shareId } = req.query;
    const BASE_URL = getBaseUrl();

    if (!shareId) {
      res.writeHead(302, { Location: BASE_URL });
      return res.end();
    }

    const ua = req.headers['user-agent'] || '';
    if (!BOT_PATTERN.test(ua)) {
      res.writeHead(302, { Location: `${BASE_URL}/${shareId}` });
      return res.end();
    }

    const FIREBASE_BASE = required('FIREBASE_DATABASE_URL');

    const dataRes = await fetch(
      `${FIREBASE_BASE}/shares/${shareId}/data.json`,
      { cache: 'no-store' },
    );

    if (!dataRes.ok) {
      res.writeHead(302, { Location: `${BASE_URL}/${shareId}` });
      return res.end();
    }

    const data = await dataRes.json();

    const male = data?.basicInfo?.maleName || '신랑';
    const female = data?.basicInfo?.femaleName || '신부';
    const date = data?.date || {};

    const title = `${male} ❤️ ${female} 결혼합니다!`;
    const desc = `${date.year ?? ''}년 ${date.month ?? ''}월 ${date.day ?? ''}일 결혼식에 초대합니다.`;

    let img = `${BASE_URL}/og-image.png`;
    const imageUrl = data?.share?.savedImageList?.[0]?.url;
    if (typeof imageUrl === 'string' && imageUrl.startsWith('http'))
      img = imageUrl;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Vary', 'User-Agent');

    res.status(200).send(`<!doctype html><html lang="ko"><head>
<meta charset="utf-8" />
<title>${title}</title>
<meta property="og:type" content="website" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
<meta property="og:image" content="${img}" />
<meta property="og:url" content="${BASE_URL}/${shareId}" />
<meta name="twitter:card" content="summary_large_image" />
<meta http-equiv="refresh" content="0; url=${BASE_URL}/${shareId}" />
</head></html>`);
  } catch {
    const fallback = process.env.PUBLIC_BASE_URL || 'http://localhost:3000';
    res.writeHead(302, { Location: fallback });
    res.end();
  }
}
