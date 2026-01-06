import { onAuthStateChanged, type User } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { auth } from '@/utils/firebase';

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const unsubscribe = onAuthStateChanged(
      auth,
      (u) => {
        if (!mounted) return;

        if (u) {
          setUser(u);
          setUid(u.uid);
        } else {
          setUser(null);
          setUid(null);
        }

        setIsLoading(false);
      },
      (err) => {
        console.error('useCurrentUser error:', err);
        if (!mounted) return;
        setUser(null);
        setUid(null);
        setIsLoading(false);
      },
    );

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  return { user, uid, isLoading };
};
