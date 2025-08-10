import type { KakaoAuthResponse } from '@/types/kakao';

let loadPromise: Promise<void> | null = null;

export const loadKakaoSdk = (): Promise<void> => {
  if (loadPromise) return loadPromise;
  loadPromise = new Promise<void>((resolve, reject) => {
    if (window.Kakao) return resolve();

    const id = 'kakao-sdk-v1';
    if (document.getElementById(id)) return resolve();

    const s = document.createElement('script');
    s.id = id;
    s.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Failed to load Kakao SDK'));
    document.head.appendChild(s);
  });
  return loadPromise;
};

export const ensureKakaoReady = async (): Promise<typeof window.Kakao> => {
  await loadKakaoSdk();
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
  }
  return window.Kakao;
};

export const kakaoLogin = (
  scope = 'account_email',
): Promise<KakaoAuthResponse> =>
  ensureKakaoReady().then(
    (Kakao) =>
      new Promise<KakaoAuthResponse>((resolve, reject) => {
        if (typeof Kakao.Auth.login !== 'function') {
          return reject(
            new Error('Kakao.Auth.login is unavailable. Use v1 SDK URL.'),
          );
        }
        Kakao.Auth.login({
          scope,
          success: resolve,
          fail: reject,
        });
      }),
  );
