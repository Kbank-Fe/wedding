import { onAuthStateChanged, type User } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { auth } from '@/utils/firebase';

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (u) => {
        setUser(u);
        setUid(u ? u.uid : null);
        setIsLoading(false);
      },
      (err) => {
        console.error('useCurrentUser error:', err);
        setUser(null);
        setUid(null);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  return { user, uid, isLoading };
};
