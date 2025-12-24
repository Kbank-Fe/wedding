const KAKAO_AUTH_URL = 'https://kauth.kakao.com/oauth/authorize';
const CLIENT_ID = import.meta.env.VITE_KAKAO_REST_API_KEY!;
const REDIRECT_URI = `${location.origin}/login`;
const SCOPE = 'openid account_email';
const POPUP_W = 480;
const POPUP_H = 640;

const isKakaoInApp = () => /kakaotalk/i.test(navigator.userAgent);

const buildState = () => {
  const s = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(s, (b) => b.toString(16).padStart(2, '0')).join('');
};

const buildAuthUrl = (state: string) =>
  `${KAKAO_AUTH_URL}?response_type=code` +
  `&client_id=${encodeURIComponent(CLIENT_ID)}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&scope=${encodeURIComponent(SCOPE)}` +
  `&state=${encodeURIComponent(state)}`;

export const openKakaoPopup = async (): Promise<{
  code: string;
  state: string;
} | null> => {
  const state = buildState();
  sessionStorage.setItem('kakao_oauth_state', state);

  const authUrl = buildAuthUrl(state);

  if (isKakaoInApp()) {
    sessionStorage.setItem('kakao_inapp', '1');
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
    const expectedState = state;
    const allowedOrigin = location.origin;

    const cleanup = () => {
      window.removeEventListener('message', onMsg);
      clearInterval(timer);
    };

    const onMsg = (ev: MessageEvent) => {
      if (ev.origin !== allowedOrigin) return;
      const d = ev.data;
      if (!d || d.type !== 'kakao_oauth_result') return;

      cleanup();
      const { code, state: gotState, error } = d;

      if (error || !code || gotState !== expectedState)
        reject(new Error(error || 'invalid_state_or_code'));
      else resolve({ code, state: gotState });
    };

    const timer = window.setInterval(() => {
      if (popup.closed) {
        cleanup();
        reject(new Error('popup_closed'));
      }
    }, 300);

    window.addEventListener('message', onMsg);
  });
};
