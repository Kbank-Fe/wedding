import { css } from "@emotion/react";
import { browserLocalPersistence, setPersistence, signInWithCustomToken } from "firebase/auth";
import { useState } from "react";

import { API_BASE } from "@/utils/apiBase";
import { auth, getOrCreateUser } from "@/utils/firebase";
import { openKakaoPopup } from "@/utils/kakaoPopup";

type ExchangeResp = { firebaseCustomToken: string; email: string | null };

export default function KakaoLoginButton() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence);

      const { code } = await openKakaoPopup();

      const resp = await fetch(`${API_BASE}/api/auth/kakao/exchange`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      if (!resp.ok) throw new Error(await resp.text());
      const { firebaseCustomToken, email } = (await resp.json()) as ExchangeResp;

      const cred = await signInWithCustomToken(auth, firebaseCustomToken);

      await getOrCreateUser({
        uid: cred.user.uid,
        email: email ?? undefined,
        provider: "kakao",
      });
    } catch (err) {
      console.error(err);
      alert("카카오 로그인에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
     <button css={kakaoButtonStyle} disabled={loading} onClick={handleLogin}>
      {loading ? (
        '처리 중…'
      ) : (
        <img alt="카카오 로그인" src="/images/kakao_login.png" />
      )}
    </button>
  );
}
const kakaoButtonStyle = css`
  justify-items: center;
`;