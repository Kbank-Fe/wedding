import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

import {
  type KakaoAuthResponse,
  type KakaoUserProfile,
} from '@/types/kakaoInfo';
import { readUserData, writeUserData } from '@/utils/firebase';
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
    const Kakao = window.Kakao;
    if (!Kakao) {
      console.error('Kakao SDK가 로드되지 않았습니다.');
      return;
    }
    if (!Kakao.isInitialized()) {
      console.error(
        'Kakao SDK가 초기화되지 않았습니다. Kakao.init(...) 호출을 확인하세요.',
      );
      return;
    }

    Kakao.Auth.login({
      scope: 'account_email',
      success(authObj: KakaoAuthResponse) {
        console.log('로그인 성공:', authObj);

        Kakao.API.request({
          url: '/v2/user/me',
          success(res: KakaoUserProfile) {
            console.log('사용자 정보:', res);

            const kakaoId = String(res.id);

            const email = res.kakao_account?.email;

            if (!email) {
              console.warn('이메일 동의가 없어 email을 받을 수 없습니다.');
            }
            const userData = readUserData(kakaoId);

            console.log(userData);

            if (userData !== null) {
              writeUserData(kakaoId, email ?? '');
            }
          },
          fail(err: unknown) {
            console.error('사용자 정보 요청 실패:', err);
          },
        });
      },
      fail(err: unknown) {
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
