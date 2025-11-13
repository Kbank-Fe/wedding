import { css } from '@emotion/react';
import {
  browserLocalPersistence,
  setPersistence,
  signInWithCustomToken,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import LoadingBackdrop from '@/components/shared/LoadingBackdrop';
import { auth, getOrCreateUser } from '@/utils/firebase';
import { openKakaoPopup } from '@/utils/kakaoPopup';

type ExchangeResp = { firebaseCustomToken: string; email: string | null };

const KakaoLoginButton = () => {
  const [uid, setUid] = useState<string | null>(null);
  const navigate = useNavigate();
  const [loading, setLoadingOpen] = useState(false);

  const handleLogin = async () => {
    if (loading) return;

    setLoadingOpen(true);
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
      setLoadingOpen(false);
    }
  };

  useEffect(() => {
    if (uid) {
      navigate('/admin');
    }
  }, [navigate, uid]);

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
  transition:
    opacity 0.2s ease,
    filter 0.2s ease;

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
