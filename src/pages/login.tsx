import { useEffect } from 'react';

const LoginPage = () => {
  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const code = p.get('code');
    const state = p.get('state');
    const error = p.get('error') || p.get('error_description');

    const isInApp = sessionStorage.getItem('kakao_inapp');
    const expectedState = sessionStorage.getItem('kakao_oauth_state');

    if (isInApp) {
      sessionStorage.removeItem('kakao_inapp');
      sessionStorage.removeItem('kakao_oauth_state');

      if (error) {
        location.replace('/login');
        return;
      }

      if (!code || state !== expectedState) {
        location.replace('/login');
        return;
      }

      location.replace(`/login?inapp_code=${code}`);
      return;
    }

    if (window.opener) {
      window.opener.postMessage(
        { type: 'kakao_oauth_result', code, state, error },
        location.origin,
      );
      setTimeout(() => window.close(), 300);
    }
  }, []);

  return null;
};

export default LoginPage;
