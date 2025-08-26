/**
 * @typedef {import('@vercel/node').VercelRequest} VercelRequest
 * @typedef {import('@vercel/node').VercelResponse} VercelResponse
 */

const { cert, getApps, initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

const KAKAO_TOKEN_URL = 'https://kauth.kakao.com/oauth/token';

function required(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function privateKey() {
  return required('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n');
}

function initAdmin() {
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: required('FIREBASE_PROJECT_ID'),
        clientEmail: required('FIREBASE_CLIENT_EMAIL'),
        privateKey: privateKey(),
      }),
    });
  }
}

function applyCors(res) {
  const origin =
    process.env.NODE_ENV === 'production'
      ? required('PUBLIC_BASE_URL')
      : 'http://localhost:3000';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');
}

function safeParseJSON(t) {
  try {
    return JSON.parse(t);
  } catch {
    return null;
  }
}

/**
 * @param {VercelRequest} req
 * @param {VercelResponse} res
 */
module.exports = async (req, res) => {
  try {
    if (req.method === 'OPTIONS') {
      applyCors(res);
      res.status(204).end();
      return;
    }

    if (req.method !== 'POST') {
      res.status(405).json({
        error: 'method_not_allowed',
        message: 'Only POST is allowed',
      });
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

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const code = body?.code;
    if (!code) {
      res.status(400).json({
        error: 'missing_code',
        message: '카카오 인가 코드(code)가 누락되었습니다.',
      });
      return;
    }

    const redirectUri =
      process.env.NODE_ENV === 'production'
        ? `${required('PUBLIC_BASE_URL')}/login`
        : 'http://localhost:3000/login';

    // 1) 카카오 토큰 요청
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

    const tokText = await tokRes.text();
    const tokJson = safeParseJSON(tokText);

    if (!tokRes.ok || !tokJson?.access_token) {
      res.status(400).json({
        error: 'token_exchange_failed',
        message: '카카오 토큰 교환 실패',
        detail: tokJson ?? tokText,
      });
      return;
    }

    const access_token = tokJson.access_token;

    const meRes = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const meText = await meRes.text();
    const meJson = safeParseJSON(meText);

    if (!meRes.ok || !meJson?.id) {
      res.status(400).json({
        error: 'me_failed',
        message: '카카오 사용자 정보 요청 실패',
        detail: meJson ?? meText,
      });
      return;
    }

    const kakaoId = String(meJson.id);
    const email = meJson.kakao_account?.email ?? null;

    initAdmin();
    const firebaseCustomToken = await getAuth().createCustomToken(
      `kakao:${kakaoId}`,
      { provider: 'kakao', email },
    );

    res.status(200).json({ firebaseCustomToken, email });
  } catch (e) {
    console.error('EXCHANGE_ERROR', e);
    res.status(500).json({
      error: 'server_error',
      name: e?.name ?? 'unknown',
      message: e?.message ?? String(e),
      stack: e?.stack ?? null,
    });
  }
};
