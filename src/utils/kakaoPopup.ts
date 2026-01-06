const KAKAO_AUTH_URL = 'https://kauth.kakao.com/oauth/authorize';
const CLIENT_ID = import.meta.env.VITE_KAKAO_REST_API_KEY!;
const SCOPE = 'openid account_email';
const POPUP_W = 480;
const POPUP_H = 640;

const isKakaoInApp = () => /kakaotalk/i.test(navigator.userAgent);

const buildState = () =>
  Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) =>
    b.toString(16).padStart(2, '0'),
  ).join('');

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
    location.href = authUrl;
    return null;
  }

  const left = window.screenX + (window.outerWidth - POPUP_W) / 2;
  const top = window.screenY + (window.outerHeight - POPUP_H) / 2;

  const popup = window.open(
    authUrl,
    'kakao_oauth',
    `width=${POPUP_W},height=${POPUP_H},left=${left},top=${top}`,
  );
  if (!popup) return null;

  return new Promise((resolve) => {
    const onMsg = (ev: MessageEvent) => {
      if (ev.origin !== location.origin) return;
      if (!ev.data || ev.data.type !== 'kakao_oauth_result') return;

      cleanup();

      const expected = sessionStorage.getItem('kakao_oauth_state');
      sessionStorage.removeItem('kakao_oauth_state');

      if (ev.data.state === expected && ev.data.code) {
        resolve({ code: ev.data.code });
      } else {
        resolve(null);
      }
    };

    const cleanup = () => {
      window.removeEventListener('message', onMsg);
      clearInterval(timer);
    };

    const timer = window.setInterval(() => {
      if (popup.closed) {
        cleanup();
        resolve(null);
      }
    }, 400);

    window.addEventListener('message', onMsg);
  });
};
