import { useEffect } from "react";

export default function LoginRedirect() {
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const payload = {
      type: "kakao_oauth_result",
      code: q.get("code"),
      state: q.get("state"),
      error: q.get("error") || q.get("error_description"),
    };

    try {
      if (window.opener) {
        window.opener.postMessage(payload, location.origin);
      }
    } finally {
      if (window.opener) window.close();
    }
  }, []);

  return (
    <div style={{ padding: 24 }}>
      카카오 인증을 마무리 중입니다…
    </div>
  );
}