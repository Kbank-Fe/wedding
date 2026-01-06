import { get, ref, serverTimestamp, update } from 'firebase/database';
import { nanoid } from 'nanoid';

import { db } from '@/utils/firebase';

export type ShareDoc<T extends object = Record<string, unknown>> = {
  ownerUid: string;
  data: T;
  createdAt: number | object;
  updatedAt: number | object;
};

/* 유저의 shareId 조회 */
export const getUserShareId = async (uid: string): Promise<string | null> => {
  const snap = await get(ref(db, `users/${uid}/shareId`));
  return snap.exists() ? (snap.val() as string) : null;
};

/* shareId → 데이터 조회 */
export const getShare = async <T extends object = Record<string, unknown>>(
  id: string,
): Promise<ShareDoc<T> | null> => {
  const snap = await get(ref(db, `shares/${id}`));
  return snap.exists() ? (snap.val() as ShareDoc<T>) : null;
};

/* 새 share 생성 + 유저 연결 */
const createShare = async <T extends object>(
  uid: string,
  data: T,
): Promise<string> => {
  const id = nanoid(12);
  const now = serverTimestamp();

  const updates: Record<string, unknown> = {};
  updates[`users/${uid}/shareId`] = id;
  updates[`shares/${id}`] = {
    ownerUid: uid,
    data,
    createdAt: now,
    updatedAt: now,
  } as ShareDoc<T>;

  await update(ref(db, '/'), updates);
  return id;
};

/* 기존 share 덮어쓰기 */
const overwriteShare = async <T extends object>(
  id: string,
  data: T,
): Promise<void> => {
  await update(ref(db, `shares/${id}`), {
    data,
    updatedAt: serverTimestamp(),
  });
};

/*
 * 유저가 가진 shareId가 있으면 → 덮어쓰기
 * 없으면 → 새로 생성
 * 최종적으로 shareId 반환
 */
export const saveUserShare = async <T extends object>(
  uid: string,
  data: T,
): Promise<string> => {
  const existing = await getUserShareId(uid);
  if (existing) {
    await overwriteShare(existing, data);
    return existing;
  }
  return await createShare(uid, data);
};
