import { onAuthStateChanged, type User } from 'firebase/auth';
import useSWR from 'swr';

import { auth } from '@/utils/firebase';

const fetchUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const off = onAuthStateChanged(auth, (user) => {
      off();
      resolve(user);
    });
  });
};
const useCurrentUserTemp = () => {
  const { data, error, isLoading, mutate } = useSWR<User | null>(
    'currentUser',
    fetchUser,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    },
  );

  return {
    user: data,
    uid: data?.uid ?? null,
    isLoading,
    error,
    refresh: mutate,
  };
};

export default useCurrentUserTemp;
