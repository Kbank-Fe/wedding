import { useEffect } from 'react';

const LoginPage = () => {
  useEffect(() => {
    if (!window.opener) {
      window.location.replace('/');
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');
    const error = params.get('error') || params.get('error_description');

    if (!code || error) {
      window.opener.postMessage(
        { type: 'kakao_oauth_result', error: true },
        window.location.origin,
      );
      window.close();
      return;
    }

    window.opener.postMessage(
      { type: 'kakao_oauth_result', code, state },
      window.location.origin,
    );

    setTimeout(() => window.close(), 200);
  }, []);

  return null;
};

export default LoginPage;
