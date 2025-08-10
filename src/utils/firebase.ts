import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { get, getDatabase, ref, set, update } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAvdp-s3IV9K-F63iPlkY9WJWIIiZ9JpQ4',
  authDomain: 'wedding-75f11.firebaseapp.com',
  databaseURL: 'https://wedding-75f11-default-rtdb.firebaseio.com',
  projectId: 'wedding-75f11',
  storageBucket: 'wedding-75f11.firebasestorage.app',
  messagingSenderId: '629833020681',
  appId: '1:629833020681:web:77fecdce4aa4dfe140cfd8',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

export const getOrCreateUser = async (params: {
  uid: string;
  email?: string;
  provider?: string;
}) => {
  const { uid, email, provider = 'kakao' } = params;
  const userRef = ref(db, `users/${uid}`);

  const snap = await get(userRef);
  const now = Date.now();

  if (!snap.exists()) {
    await set(userRef, {
      userId: uid,
      ...(email ? { email } : {}),
      provider,
      createdAt: now,
      lastLoginAt: now,
    });
  } else {
    const patch: Record<string, unknown> = { lastLoginAt: now };
    if (email) patch.email = email;
    await update(userRef, patch);
  }

  const after = await get(userRef);
  return after.val() as {
    userId: string;
    email?: string;
    provider: string;
    createdAt: number;
    lastLoginAt: number;
    [k: string]: unknown;
  };
};
