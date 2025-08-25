import type { VercelRequest, VercelResponse } from "@vercel/node";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

type KakaoTokenResponse = { access_token: string };
type KakaoMe = { id: number; kakao_account?: { email?: string | null } };

const KAKAO_TOKEN_URL = "https://kauth.kakao.com/oauth/token";

function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}
function privateKey(): string {
  return required("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n");
}
function initAdmin(): void {
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: required("FIREBASE_PROJECT_ID"),
        clientEmail: required("FIREBASE_CLIENT_EMAIL"),
        privateKey: privateKey(),
      }),
    });
  }
}
function applyCors(res: VercelResponse): void {
  const origin =
    process.env.NODE_ENV === "production"
      ? required("PUBLIC_BASE_URL")
      : "http://localhost:3000";
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");
}
function safeParseJSON<T>(t: string): T | null {
  try { return JSON.parse(t) as T; } catch { return null; }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "OPTIONS") { applyCors(res); res.status(204).end(); return; }
    if (req.method !== "POST") { res.status(405).json({ error: "method_not_allowed" }); return; }
    applyCors(res);

    ["PUBLIC_BASE_URL","KAKAO_REST_API_KEY","FIREBASE_PROJECT_ID","FIREBASE_CLIENT_EMAIL","FIREBASE_PRIVATE_KEY"]
      .forEach(required);

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const code = body?.code as string | undefined;
    if (!code) { res.status(400).json({ error: "missing_code" }); return; }

    const redirectUri = `${required("PUBLIC_BASE_URL")}/kakao-redirect.html`;

    const form = new URLSearchParams();
    form.set("grant_type", "authorization_code");
    form.set("client_id", required("KAKAO_REST_API_KEY"));
    if (process.env.KAKAO_CLIENT_SECRET) form.set("client_secret", process.env.KAKAO_CLIENT_SECRET);
    form.set("redirect_uri", redirectUri);
    form.set("code", code);

    const tokRes = await fetch(KAKAO_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form,
    });
    const tokText = await tokRes.text();
    const tokJson = safeParseJSON<KakaoTokenResponse>(tokText);
    if (!tokRes.ok) { res.status(400).json({ error: "token_exchange_failed", detail: tokJson ?? tokText }); return; }
    if (!tokJson || typeof tokJson.access_token !== "string") { res.status(400).json({ error: "missing_access_token_from_kakao" }); return; }
    const access_token = tokJson.access_token;

    const meRes = await fetch("https://kapi.kakao.com/v2/user/me", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const meText = await meRes.text();
    const meJson = safeParseJSON<KakaoMe>(meText);
    if (!meRes.ok) { res.status(400).json({ error: "me_failed", detail: meJson ?? meText }); return; }
    if (!meJson || typeof meJson.id !== "number") { res.status(400).json({ error: "invalid_kakao_me" }); return; }

    const kakaoId = String(meJson.id);
    const email: string | null = meJson.kakao_account?.email ?? null;

    initAdmin();
    const firebaseCustomToken = await getAuth().createCustomToken(`kakao:${kakaoId}`, { provider: "kakao", email });

    res.status(200).json({ firebaseCustomToken, email });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    res.status(500).json({ error: "server_error", detail: msg });
  }
}