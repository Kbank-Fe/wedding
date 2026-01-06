import { useEffect } from 'react';

const LoginInApp = () => {
  useEffect(() => {
    sessionStorage.setItem('kakao_oauth_inapp', '1');

    const p = new URLSearchParams(location.search);
    const code = p.get('code');
    const error = p.get('error') || p.get('error_description');

    if (!code || error) {
      location.replace('/login');
      return;
    }

    location.replace(`/login#inapp_code=${encodeURIComponent(code)}`);
  }, []);

  return null;
};

export default LoginInApp;
