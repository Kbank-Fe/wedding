import { useEffect } from 'react';

const LoginPage = () => {
  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const code = p.get('code');
    const state = p.get('state');
    const error = p.get('error') || p.get('error_description');

    if (error || !code) {
      location.replace('/login');
      return;
    }

    if (window.opener) {
      const expected = sessionStorage.getItem('kakao_oauth_state');
      sessionStorage.removeItem('kakao_oauth_state');

      if (!expected || !state || state !== expected) {
        location.replace('/login');
        return;
      }

      window.opener.postMessage(
        { type: 'kakao_oauth_result', code, state },
        location.origin,
      );
      setTimeout(() => window.close(), 300);
      return;
    }

    location.replace(`/login?inapp_code=${encodeURIComponent(code)}`);
  }, []);

  return null;
};

export default LoginPage;
