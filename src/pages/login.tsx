import { css } from '@emotion/react';
import { useEffect } from 'react';

const LoginPage = () => {
  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const code = p.get('code');
    const state = p.get('state');
    const error = p.get('error') || p.get('error_description');

    try {
      window.opener?.postMessage(
        { type: 'kakao_oauth_result', code, state, error },
        location.origin,
      );
    } finally {
      if (window.opener) window.close();
    }
  }, []);

  return (
    <div css={popupStyle}>
      <p>카카오 인증을 마무리 중입니다…</p>
      <p>창이 자동으로 닫히지 않으면 이 창을 닫아주세요.</p>
    </div>
  );
};

const popupStyle = css`
  padding: 1.5rem;
`;

export default LoginPage;
