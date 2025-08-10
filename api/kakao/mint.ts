import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';

type KakaoUserMe = { id: number; kakao_account?: { email?: string } };

const getEnv = (k: string) => {
  const v = process.env[k];
  if (!v) throw new Error(`Missing env: ${k}`);
  return v;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST')
      return res.status(405).json({ error: 'method_not_allowed' });

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const accessToken = (body?.access_token ?? '') as string;
    if (!accessToken)
      return res.status(400).json({ error: 'missing_access_token' });

    const meResp = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!meResp.ok) {
      const detail = await meResp.text();
      return res.status(400).json({ error: 'kakao_user_me_failed', detail });
    }
    const me = (await meResp.json()) as KakaoUserMe;
    const kakaoId = me.id?.toString();
    if (!kakaoId) return res.status(400).json({ error: 'no_kakao_id' });

    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: getEnv('FIREBASE_CLIENT_EMAIL'),
      sub: getEnv('FIREBASE_CLIENT_EMAIL'),
      aud: 'https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit',
      iat: now,
      exp: now + 60 * 5,
      uid: `kakao:${kakaoId}`,
      claims: { provider: 'kakao', email: me.kakao_account?.email ?? null },
    };

    const privateKey = getEnv('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n');
    const customToken = jwt.sign(payload, privateKey, { algorithm: 'RS256' });

    return res.status(200).json({
      customToken,
      email: me.kakao_account?.email ?? null,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'mint_failed' });
  }
}
