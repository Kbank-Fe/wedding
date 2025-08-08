import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { get, getDatabase, ref, set } from 'firebase/database';

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

export const writeUserData = async (userId: string, email: string) => {
  await set(ref(db, `users/${userId}`), {
    userId,
    email,
  });
};

export const readUserData = async (userId: string) => {
  const snapshot = await get(ref(db, `users/${userId}`));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return null;
  }
};
