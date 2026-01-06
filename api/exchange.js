import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const KAKAO_TOKEN_URL = 'https://kauth.kakao.com/oauth/token';

const required = (name) => {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
};

const privateKey = () => required('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n');

const initAdmin = () => {
  if (getApps().length) return;

  initializeApp({
    credential: cert({
      projectId: required('FIREBASE_PROJECT_ID'),
      clientEmail: required('FIREBASE_CLIENT_EMAIL'),
      privateKey: privateKey(),
    }),
  });
};

const applyCors = (res) => {
  const origin =
    process.env.NODE_ENV === 'production'
      ? required('PUBLIC_BASE_URL')
      : 'http://localhost:3000';

  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');
};

const safeParseJSON = (t) => {
  try {
    return JSON.parse(t);
  } catch {
    return null;
  }
};

/**
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
const handler = async (req, res) => {
  try {
    if (req.method === 'OPTIONS') {
      applyCors(res);
      res.status(204).end();
      return;
    }

    if (req.method !== 'POST') {
      res.status(405).json({ error: 'method_not_allowed' });
      return;
    }

    applyCors(res);

    [
      'PUBLIC_BASE_URL',
      'KAKAO_REST_API_KEY',
      'FIREBASE_PROJECT_ID',
      'FIREBASE_CLIENT_EMAIL',
      'FIREBASE_PRIVATE_KEY',
    ].forEach(required);

    const body =
      typeof req.body === 'string' ? safeParseJSON(req.body) : req.body;

    const code = body && body.code;
    if (!code) {
      res.status(400).json({ error: 'missing_code' });
      return;
    }

    const redirectUri = `${required('PUBLIC_BASE_URL')}/login`;

    const form = new URLSearchParams();
    form.set('grant_type', 'authorization_code');
    form.set('client_id', required('KAKAO_REST_API_KEY'));
    if (process.env.KAKAO_CLIENT_SECRET) {
      form.set('client_secret', process.env.KAKAO_CLIENT_SECRET);
    }
    form.set('redirect_uri', redirectUri);
    form.set('code', code);

    const tokRes = await fetch(KAKAO_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form,
    });

    const tokJson = safeParseJSON(await tokRes.text());

    if (!tokRes.ok || !tokJson || !tokJson.access_token) {
      res.status(400).json({ error: 'token_exchange_failed', detail: tokJson });
      return;
    }

    const meRes = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${tokJson.access_token}` },
    });

    const meJson = safeParseJSON(await meRes.text());

    if (!meRes.ok || !meJson || !meJson.id) {
      res.status(400).json({ error: 'me_failed', detail: meJson });
      return;
    }

    initAdmin();

    const firebaseCustomToken = await getAuth().createCustomToken(
      `kakao:${meJson.id}`,
      {
        provider: 'kakao',
        email:
          meJson.kakao_account && meJson.kakao_account.email
            ? meJson.kakao_account.email
            : null,
      },
    );

    res.status(200).json({
      firebaseCustomToken,
      email:
        meJson.kakao_account && meJson.kakao_account.email
          ? meJson.kakao_account.email
          : null,
    });
  } catch (e) {
    console.error('EXCHANGE_FATAL', e);
    res.status(500).json({ error: 'server_error' });
  }
};

export default handler;
