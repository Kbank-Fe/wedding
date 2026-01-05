import { css } from '@emotion/react';
import {
  browserLocalPersistence,
  setPersistence,
  signInWithCustomToken,
} from 'firebase/auth';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import LoadingBackdrop from '@/components/shared/LoadingBackdrop';
import { auth, getOrCreateUser } from '@/utils/firebase';
import { openKakaoPopup } from '@/utils/kakaoPopup';

type ExchangeResp = { firebaseCustomToken: string; email: string | null };

const KakaoLoginButton = () => {
  const navigate = useNavigate();
  const [loading, setLoadingOpen] = useState(false);
  const exchangedRef = useRef(false);

  const exchangeAndLogin = useCallback(
    async (code: string) => {
      if (exchangedRef.current) return;
      exchangedRef.current = true;

      try {
        setLoadingOpen(true);
        await setPersistence(auth, browserLocalPersistence);

        const resp = await fetch('/api/exchange', {
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

        window.history.replaceState(null, '', '/login');
        navigate('/admin', { replace: true });
      } catch (e) {
        console.error(e);
        exchangedRef.current = false;
        setLoadingOpen(false);
      }
    },
    [navigate],
  );

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const inappCode = p.get('inapp_code');
    if (!inappCode) return;

    exchangeAndLogin(inappCode);
  }, [exchangeAndLogin]);

  const handleLogin = async () => {
    if (loading) return;
    setLoadingOpen(true);

    const result = await openKakaoPopup();
    if (!result) {
      setLoadingOpen(false);
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
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  position: relative;
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
