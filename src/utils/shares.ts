import { get, ref, serverTimestamp, update } from "firebase/database";
import { nanoid } from "nanoid";

import { db } from "@/utils/firebase";

export type ShareDoc<T extends object = Record<string, unknown>> = {
  ownerUid: string;
  data: T;
  createdAt: number | object;
  updatedAt: number | object;
};

/** 새 Share 문서 생성 + 유저와 연결 */
export async function createAndLinkShare<T extends object>(
  uid: string,
  data: T
): Promise<string> {
  const id = nanoid();
  const now = serverTimestamp();

  const updates: Record<string, unknown> = {};
  updates[`users/${uid}/shareId`] = id;
  updates[`shares/${id}`] = {
    ownerUid: uid,
    data,
    createdAt: now,
    updatedAt: now,
  } as ShareDoc<T>;

  await update(ref(db, "/"), updates);
  return id;
}

/** 전체 data 교체 */
export async function setShareData<T extends object>(
  id: string,
  data: T
): Promise<void> {
  await update(ref(db, `shares/${id}`), {
    data,
    updatedAt: serverTimestamp(),
  });
}

/** data 일부만 패치 */
export async function patchShareData(
  id: string,
  patch: Record<string, unknown>
): Promise<void> {
  const updates: Record<string, unknown> = {
    [`shares/${id}/updatedAt`]: serverTimestamp(),
  };
  for (const [k, v] of Object.entries(patch)) {
    updates[`shares/${id}/data/${k}`] = v;
  }
  await update(ref(db, "/"), updates);
}

/** 유저 → 연결된 shareId 조회 */
export async function getUserShareId(uid: string): Promise<string | null> {
  const snap = await get(ref(db, `users/${uid}/shareId`));
  return snap.exists() ? (snap.val() as string) : null;
}

/** 특정 share 문서 조회 */
export async function getShare<T extends object = Record<string, unknown>>(
  id: string
): Promise<ShareDoc<T> | null> {
  const snap = await get(ref(db, `shares/${id}`));
  return snap.exists() ? (snap.val() as ShareDoc<T>) : null;
}