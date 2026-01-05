const KAKAO_AUTH_URL = 'https://kauth.kakao.com/oauth/authorize';
const CLIENT_ID = import.meta.env.VITE_KAKAO_REST_API_KEY!;
const SCOPE = 'openid account_email';
const POPUP_W = 480;
const POPUP_H = 640;

const isKakaoInApp = () => /kakaotalk/i.test(navigator.userAgent);

const buildState = () => {
  const s = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(s, (b) => b.toString(16).padStart(2, '0')).join('');
};

const buildAuthUrl = (state: string, inapp: boolean) => {
  const redirectUri = inapp
    ? `${location.origin}/login-inapp`
    : `${location.origin}/login`;

  return (
    `${KAKAO_AUTH_URL}?response_type=code` +
    `&client_id=${encodeURIComponent(CLIENT_ID)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent(SCOPE)}` +
    `&state=${encodeURIComponent(state)}`
  );
};

export const openKakaoPopup = async (): Promise<{ code: string } | null> => {
  const state = buildState();
  const inapp = isKakaoInApp();
  const authUrl = buildAuthUrl(state, inapp);

  sessionStorage.setItem('kakao_oauth_state', state);

  if (inapp) {
    location.replace(authUrl);
    return null;
  }

  const left = window.screenX + (window.outerWidth - POPUP_W) / 2;
  const top = window.screenY + (window.outerHeight - POPUP_H) / 2;

  const popup = window.open(
    authUrl,
    'kakao_oauth',
    `width=${POPUP_W},height=${POPUP_H},left=${left},top=${top}`,
  );
  if (!popup) throw new Error('popup_blocked');

  return new Promise((resolve, reject) => {
    const allowedOrigin = location.origin;

    const onMsg = (ev: MessageEvent) => {
      if (ev.origin !== allowedOrigin) return;
      const d = ev.data;
      if (!d || d.type !== 'kakao_oauth_result') return;

      window.removeEventListener('message', onMsg);

      const expected = sessionStorage.getItem('kakao_oauth_state');
      sessionStorage.removeItem('kakao_oauth_state');

      if (!d.code || d.state !== expected) {
        reject(new Error('invalid_state'));
      } else {
        resolve({ code: d.code });
      }
    };

    window.addEventListener('message', onMsg);
  });
};
