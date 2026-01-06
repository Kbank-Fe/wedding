import { useEffect } from 'react';

const LoginPage = () => {
  useEffect(() => {
    const search = new URLSearchParams(location.search);
    const hash = new URLSearchParams(location.hash.replace('#', ''));

    const code = search.get('code');
    const state = search.get('state');
    const error = search.get('error') || search.get('error_description');
    const inappCode = hash.get('inapp_code');
    const isInAppFlow = sessionStorage.getItem('kakao_oauth_inapp') === '1';

    if (inappCode) {
      location.hash = '';
      location.replace(`/login?code=${encodeURIComponent(inappCode)}`);
      return;
    }

    if (error) {
      location.replace('/login');
      return;
    }

    if (window.opener && !isInAppFlow && code) {
      const expected = sessionStorage.getItem('kakao_oauth_state');
      sessionStorage.removeItem('kakao_oauth_state');

      if (expected && state === expected) {
        window.opener.postMessage(
          { type: 'kakao_oauth_result', code, state },
          location.origin,
        );
      }

      setTimeout(() => window.close(), 300);
      return;
    }

    sessionStorage.removeItem('kakao_oauth_inapp');
  }, []);

  return null;
};

export default LoginPage;
