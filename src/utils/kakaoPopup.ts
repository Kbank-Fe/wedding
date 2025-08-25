const KAKAO_AUTH_URL = "https://kauth.kakao.com/oauth/authorize";
const CLIENT_ID = import.meta.env.VITE_KAKAO_REST_API_KEY!;
const REDIRECT_URI = `${location.origin}/kakao-redirect.html`;
const SCOPE = "openid account_email";
const POPUP_W = 480;
const POPUP_H = 640;

function buildState(): string {
  const s = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(s, b => b.toString(16).padStart(2, "0")).join("");
}
function openPopupOrThrow(url: string, name: string, specs: string): Window {
  const w = window.open(url, name, specs);
  if (!w) throw new Error("팝업이 차단되었습니다.");
  return w;
}

export function openKakaoPopup(): Promise<{ code: string; state: string }> {
  const state = buildState();
  sessionStorage.setItem("kakao_oauth_state", state);

  const left = window.screenX + (window.outerWidth - POPUP_W) / 2;
  const top = window.screenY + (window.outerHeight - POPUP_H) / 2;

  const authUrl =
    `${KAKAO_AUTH_URL}?response_type=code` +
    `&client_id=${encodeURIComponent(CLIENT_ID)}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&scope=${encodeURIComponent(SCOPE)}` +
    `&state=${encodeURIComponent(state)}`;

  const popup = openPopupOrThrow(
    authUrl,
    "kakao_oauth",
    `width=${POPUP_W},height=${POPUP_H},left=${left},top=${top}`
  );

  return new Promise<{ code: string; state: string }>((resolve, reject) => {
    const expectedState = state;
    const allowedOrigin = location.origin;

    const timer = window.setInterval(() => {
      if (popup.closed) {
        window.clearInterval(timer);
        window.removeEventListener("message", onMsg);
        reject(new Error("사용자가 팝업을 닫았습니다."));
      }
    }, 300);

    function cleanup() {
      window.clearInterval(timer);
      window.removeEventListener("message", onMsg);
      try { popup.close(); } catch { /* empty */ }
    }
    function onMsg(ev: MessageEvent) {
      if (ev.origin !== allowedOrigin) return;
      const d = ev.data || {};
      if (d.type !== "kakao_oauth_result") return;

      const { code, state: gotState, error } = d;
      if (error) { cleanup(); reject(new Error(error)); return; }
      if (!code || gotState !== expectedState) { cleanup(); reject(new Error("invalid_state_or_code")); return; }
      cleanup();
      resolve({ code, state: gotState });
    }
    window.addEventListener("message", onMsg);
  });
}