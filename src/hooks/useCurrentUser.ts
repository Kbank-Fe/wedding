import type { User } from 'firebase/auth';
import useSWR from 'swr';

import { waitForAuth } from '@/utils/firebase'; // 방금 만든 waitForAuth

export function useCurrentUser() {
  const { data, error } = useSWR<User | null>('currentUser', waitForAuth, {
    revalidateOnFocus: false, // 포커스시 재검증 필요없으면 꺼두기
  });

  return {
    user: data ?? null, // Firebase User 객체 or null
    isLoading: !error && !data,
    isError: error,
  };
}
