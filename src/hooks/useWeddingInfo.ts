import { useEffect } from 'react';
import useSWR from 'swr';

import type { WeddingInfo } from '@/types/wedding';
import { getShare, getUserShareId } from '@/utils/shares';

const fetchShare = async (uid: string): Promise<WeddingInfo | null> => {
  const id = await getUserShareId(uid);
  if (!id) return null;

  const doc = await getShare<WeddingInfo>(id);
  return doc?.data ?? null;
};

const useWeddingInfo = (
  uid: string | null,
  setDeep: (fn: (draft: WeddingInfo) => void) => void,
) => {
  const { data, error, isLoading } = useSWR<WeddingInfo | null>(
    uid ? ['weddingInfo', uid] : null,
    () => fetchShare(uid!),
  );

  useEffect(() => {
    if (data) {
      setDeep((draft) => {
        Object.assign(draft, data);
      });
    }
  }, [data, setDeep]);

  return {
    weddingInfo: data,
    isLoading,
    isError: !!error,
  };
};

export default useWeddingInfo;
