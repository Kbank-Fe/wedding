import { css } from "@emotion/react";
import { browserLocalPersistence, setPersistence, signInWithCustomToken } from "firebase/auth";
import { useState } from "react";

import { API_BASE } from "@/utils/apiBase";
import { auth, getOrCreateUser, waitForAuth } from "@/utils/firebase";
import { openKakaoPopup } from "@/utils/kakaoPopup";
import { getShare, saveUserShare, type ShareDoc } from "@/utils/shares";

type ExchangeResp = { firebaseCustomToken: string; email: string | null };
type DummyData = {
  title: string;
  savedAt: string;
  random: number;
};

export default function KakaoLoginAndSaveTest() {
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState<string | null>(null);
  const [shareId, setShareId] = useState<string | null>(null);
  const [shareDoc, setShareDoc] = useState<ShareDoc<DummyData> | null>(null);

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
      await getOrCreateUser({ uid: cred.user.uid, email: email ?? undefined, provider: "kakao" });

      setUid(cred.user.uid);
    } catch (err) {
      console.error(err);
      alert("카카오 로그인 실패");
    } finally {
      setLoading(false);
    }
  };

const handleSave = async () => {
  const user = await waitForAuth();
  if (!user) return;

  const dummy: DummyData = {
    title: "테스트 데이터",
    savedAt: new Date().toISOString(),
    random: Math.floor(Math.random() * 1000),
  };

  const id = await saveUserShare(user.uid, dummy);
  setShareId(id);

  const doc = await getShare<DummyData>(id);
  setShareDoc(doc);
};

  return (
    <div css={wrapper}>
      {!uid ? (
        <button css={button} disabled={loading} onClick={handleLogin}>
          {loading ? "로그인 중…" : <img alt="카카오 로그인" src="/images/kakao_login.png" />}
        </button>
      ) : (
        <div css={panel}>
          <p>UID: {uid}</p>
          <button css={button} onClick={handleSave}>데이터 저장</button>
          {shareId && (
            <div css={result}>
              <p>저장된 ID: {shareId}</p>
              <pre>{JSON.stringify(shareDoc, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const wrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const panel = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
`;

const button = css`
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 6px;
  background: #fce000;
  font-weight: bold;
  cursor: pointer;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const result = css`
  margin-top: 1rem;
  background: #f7f7f7;
  padding: 1rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  font-size: 0.9rem;
  white-space: pre-wrap;
  word-break: break-all;
`;