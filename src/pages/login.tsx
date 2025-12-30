import { useEffect } from 'react';

const LoginPage = () => {
  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const code = p.get('code');
    const state = p.get('state');
    const error = p.get('error') || p.get('error_description');

    if (error) {
      location.replace('/login');
      return;
    }

    if (window.opener && code && state) {
      window.opener.postMessage(
        { type: 'kakao_oauth_result', code, state },
        location.origin,
      );
      setTimeout(() => window.close(), 300);
    }
  }, []);

  return null;
};

export default LoginPage;
