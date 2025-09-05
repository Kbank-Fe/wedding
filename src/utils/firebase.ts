import { type FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import {
  type Auth,
  getAuth,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import {
  type Database,
  get,
  getDatabase,
  ref,
  serverTimestamp,
  set,
  update,
} from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
} as const;

const getFirebaseApp = (): FirebaseApp => {
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
};

const app = getFirebaseApp();
export const auth: Auth = getAuth(app);
export const db: Database = getDatabase(app);
export const storage = getStorage(app);

export type UserRow = {
  userId: string;
  email?: string;
  provider: string;
  createdAt: number;
  lastLoginAt: number;
  [k: string]: unknown;
};

export const getOrCreateUser = async (params: {
  uid: string;
  email?: string;
  provider?: string;
}): Promise<UserRow> => {
  const { uid, email, provider = 'kakao' } = params;
  const userRef = ref(db, `users/${uid}`);
  const snap = await get(userRef);

  if (!snap.exists()) {
    const payload: Record<string, unknown> = {
      userId: uid,
      provider,
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
    };
    if (email) payload.email = email;
    await set(userRef, payload);
  } else {
    const patch: Record<string, unknown> = { lastLoginAt: serverTimestamp() };
    if (email) patch.email = email;
    await update(userRef, patch);
  }

  const after = await get(userRef);
  return after.val() as UserRow;
};

export const getJSON = async <T>(
  path: string,
  database: Database = db,
): Promise<T | null> => {
  const snap = await get(ref(database, path));
  return snap.exists() ? (snap.val() as T) : null;
};

export const updateJSON = async (
  path: string,
  patch: Record<string, unknown>,
  database: Database = db,
): Promise<void> => {
  await update(ref(database, path), patch);
};

export const getCurrentUser = (): User | null => auth.currentUser;

export const isLogin = (): boolean => !!auth.currentUser;

export const waitForAuth = (): Promise<User | null> =>
  new Promise((resolve) => {
    const off = onAuthStateChanged(auth, (u) => {
      off();
      resolve(u);
    });
  });
