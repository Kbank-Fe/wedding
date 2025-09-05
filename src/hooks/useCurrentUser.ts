import type { User } from 'firebase/auth';
import useSWR from 'swr';

import { waitForAuth } from '@/utils/firebase';

export const useCurrentUser = () => {
  const { data, error } = useSWR<User | null>('currentUser', waitForAuth, {
    revalidateOnFocus: false,
  });

  return {
    user: data,
    uid: data?.uid ?? null,
    isLoading: !error && !data,
    isError: error,
  };
};
