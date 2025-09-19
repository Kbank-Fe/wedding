import { css } from '@emotion/react';
import {
  browserLocalPersistence,
  setPersistence,
  signInWithCustomToken,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { auth, getOrCreateUser } from '@/utils/firebase';
import { openKakaoPopup } from '@/utils/kakaoPopup';

type ExchangeResp = { firebaseCustomToken: string; email: string | null };

export default function KakaoLoginAndSaveTest() {
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await setPersistence(auth, browserLocalPersistence);
      const { code } = await openKakaoPopup();

      const resp = await fetch(`/api/exchange`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      if (!resp.ok) throw new Error(await resp.text());
      const { firebaseCustomToken, email } =
        (await resp.json()) as ExchangeResp;

      const cred = await signInWithCustomToken(auth, firebaseCustomToken);
      await getOrCreateUser({
        uid: cred.user.uid,
        email: email ?? undefined,
        provider: 'kakao',
      });

      setUid(cred.user.uid);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (uid) {
      navigate('/admin');
    }
  }, [navigate, uid]);

  return (
    <div css={wrapper}>
      {!uid && (
        <button css={button} disabled={loading} onClick={handleLogin}>
          <img alt="카카오 로그인" src="/images/kakao_login.png" />
        </button>
      )}
    </div>
  );
}

const wrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const button = css`
  display: inline-block;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  line-height: 0;

  transition:
    opacity 0.2s ease,
    filter 0.2s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    filter: grayscale(100%) brightness(95%);
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;
