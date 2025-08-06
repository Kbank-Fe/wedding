export const loadKakaoSdk = () =>
  new Promise<void>((resolve) => {
    if (window.kakao) return resolve();

    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
