import { useEffect } from 'react';

const LoginInApp = () => {
  useEffect(() => {
    sessionStorage.setItem('kakao_oauth_inapp', '1');

    const p = new URLSearchParams(location.search);
    const code = p.get('code');
    const error = p.get('error');

    if (!code || error) {
      location.href = '/login';
      return;
    }

    location.href = `/login#inapp_code=${encodeURIComponent(code)}`;
  }, []);

  return null;
};

export default LoginInApp;
