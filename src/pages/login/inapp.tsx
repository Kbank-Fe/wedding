import { useEffect } from 'react';

const KakaoInAppRedirect = () => {
  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const code = p.get('code');
    const error = p.get('error');

    if (!code || error) {
      location.replace('/login');
      return;
    }

    location.replace(`/login?inapp_code=${code}`);
  }, []);

  return null;
};

export default KakaoInAppRedirect;
