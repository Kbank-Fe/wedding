import { css } from '@emotion/react';
import {
  browserLocalPersistence,
  setPersistence,
  signInWithCustomToken,
} from 'firebase/auth';
import { useState } from 'react';

import { auth, getOrCreateUser } from '@/utils/firebase';
import { kakaoLogin } from '@/utils/kakao';

type MintResp = { customToken: string; email: string | null };

export default function KakaoLoginButton() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence);

      const { access_token } = await kakaoLogin('account_email');

      const resp = await fetch('/api/kakao/mint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_token }),
      });
      if (!resp.ok) throw new Error(await resp.text());
      const { customToken, email } = (await resp.json()) as MintResp;

      const cred = await signInWithCustomToken(auth, customToken);

      const userRow = await getOrCreateUser({
        uid: cred.user.uid,
        email: email ?? undefined,
        provider: 'kakao',
      });

      console.log('user row:', userRow);
    } catch (e) {
      console.error(e);
      alert('카카오 로그인에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button css={kakaoButtonStyle} disabled={loading} onClick={handleLogin}>
      {loading ? (
        '처리 중…'
      ) : (
        <img alt="카카오 로그인" src="/images/kakao_login.png" />
      )}
    </button>
  );
}
const kakaoButtonStyle = css`
  justify-items: center;
`;
