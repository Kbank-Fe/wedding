import { css } from '@emotion/react';
import {
  browserLocalPersistence,
  inMemoryPersistence,
  setPersistence,
  signInWithCustomToken,
} from 'firebase/auth';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import LoadingBackdrop from '@/components/shared/LoadingBackdrop';
import { auth, getOrCreateUser } from '@/utils/firebase';
import { openKakaoPopup } from '@/utils/kakaoPopup';

type ExchangeResp = {
  firebaseCustomToken: string;
  email: string | null;
};

const ensurePersistence = async () => {
  try {
    await setPersistence(auth, browserLocalPersistence);
  } catch {
    try {
      await setPersistence(auth, inMemoryPersistence);
    } catch {
      console.warn('[kakao] persistence unavailable');
    }
  }
};

const KakaoLoginButton = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const inFlightRef = useRef(false);
  const usedCodeRef = useRef<string | null>(null);

  const exchangeAndLogin = useCallback(
    async (code: string) => {
      if (inFlightRef.current || usedCodeRef.current === code) return;
      inFlightRef.current = true;
      usedCodeRef.current = code;

      try {
        setLoading(true);
        await ensurePersistence();

        const resp = await fetch('/api/exchange', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });

        if (!resp.ok) throw new Error(await resp.text());

        const { firebaseCustomToken, email } =
          (await resp.json()) as ExchangeResp;

        const cred = await signInWithCustomToken(auth, firebaseCustomToken);
        if (!cred.user) throw new Error('firebase sign-in failed');

        await getOrCreateUser({
          uid: cred.user.uid,
          email: email ?? undefined,
          provider: 'kakao',
        });

        window.history.replaceState(null, '', '/');
        navigate('/admin', { replace: true });
      } catch (e) {
        console.error('[kakao] login failed', e);
        inFlightRef.current = false;
        setLoading(false);
      }
    },
    [navigate],
  );

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const hash = new URLSearchParams(location.hash.replace('#', ''));

    const code = hash.get('inapp_code') || search.get('code');
    if (!code) return;

    location.hash = '';
    window.history.replaceState(null, '', '/');
    exchangeAndLogin(code);
  }, [exchangeAndLogin]);

  const handleLogin = async () => {
    if (loading || inFlightRef.current) return;

    setLoading(true);
    const result = await openKakaoPopup();

    if (!result) {
      setLoading(false);
      return;
    }

    await exchangeAndLogin(result.code);
  };

  return (
    <div css={wrapperStyle}>
      <button css={buttonStyle} disabled={loading} onClick={handleLogin}>
        <img alt="카카오 로그인" src="/images/icon/kakao_login.png" />
      </button>
      <LoadingBackdrop open={loading} />
    </div>
  );
};

const wrapperStyle = css`
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

const buttonStyle = css`
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    filter: grayscale(100%) brightness(95%);
  }

  img {
    width: 300px;
  }
`;

export default KakaoLoginButton;
