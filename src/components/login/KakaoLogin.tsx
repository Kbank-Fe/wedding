import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

import { loadKakaoSdk } from '@/utils/kakao';

const KakaoLogin = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadKakaoSdk().then(() => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
      }
      setReady(true);
    });
  }, []);

  const handleLogin = () => {
    if (!window.Kakao) return;

    window.Kakao.Auth.login({
      scope: 'account_email',
      success(authObj) {
        console.log('로그인 성공:', authObj);

        window.Kakao.API.request({
          url: '/v2/user/me',
          success(res) {
            console.log('사용자 정보:', res);
            // 여기서 사용자 정보를 저장하거나, 로그인 처리하면 됩니다.
          },
          fail(err) {
            console.error('사용자 정보 요청 실패:', err);
          },
        });
      },
      fail(err) {
        console.error('로그인 실패:', err);
      },
    });
  };

  return (
    <button css={kakaoButtonStyle} disabled={!ready} onClick={handleLogin}>
      <img alt="카카오 로그인" src="/images/kakao_login.png" />
    </button>
  );
};

const kakaoButtonStyle = css`
  justify-items: center;
`;

export default KakaoLogin;
