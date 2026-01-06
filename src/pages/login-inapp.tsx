import { useEffect } from 'react';

const LoginInApp = () => {
  useEffect(() => {
    sessionStorage.setItem('kakao_oauth_inapp', '1');

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error') || params.get('error_description');

    if (!code || error) {
      window.location.replace('/');
      return;
    }

    window.location.replace(`/login#inapp_code=${encodeURIComponent(code)}`);
  }, []);

  return null;
};

export default LoginInApp;
