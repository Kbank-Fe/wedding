import { useEffect } from 'react';

const isKakaoInApp = () => /kakaotalk/i.test(navigator.userAgent);

const LoginPage = () => {
  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const hash = new URLSearchParams(location.hash.replace('#', ''));

    const code = search.get('code');
    const state = search.get('state');
    const error = search.get('error') || search.get('error_description');
    const inappCode = hash.get('inapp_code');
    const inapp = isKakaoInApp();
    const isInAppFlow = sessionStorage.getItem('kakao_oauth_inapp') === '1';

    if (inappCode) {
      location.hash = '';
      location.href = `/login?code=${encodeURIComponent(inappCode)}`;
      return;
    }

    if ((error || !code) && !inapp) {
      location.href = '/login';
      return;
    }

    if (window.opener && !isInAppFlow) {
      const expected = sessionStorage.getItem('kakao_oauth_state');
      sessionStorage.removeItem('kakao_oauth_state');

      if (!expected || !state || state !== expected) {
        location.href = '/login';
        return;
      }

      window.opener.postMessage(
        { type: 'kakao_oauth_result', code, state },
        location.origin,
      );

      setTimeout(() => window.close(), 300);
      return;
    }

    sessionStorage.removeItem('kakao_oauth_inapp');

    if (code) {
      location.href = `/login?code=${encodeURIComponent(code)}`;
    }
  }, []);

  return null;
};

export default LoginPage;
