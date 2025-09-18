import { useEffect } from 'react';
import useSWR from 'swr';

import type { WeddingInfo } from '@/types/wedding';
import { getShare, getUserShareId } from '@/utils/shares';

const fetchWeddingInfoByUid = async (
  uid: string,
): Promise<WeddingInfo | null> => {
  const shareId = await getUserShareId(uid);
  if (!shareId) return null;

  const doc = await getShare<WeddingInfo>(shareId);
  return doc?.data ?? null;
};

export const useWeddingInfoByUid = (
  uid: string | null,
  setDeep?: (fn: (draft: WeddingInfo) => void) => void,
) => {
  const shouldFetch = !!uid;

  const { data, error, isLoading } = useSWR<WeddingInfo | null>(
    shouldFetch ? ['weddingInfoByUid', uid] : null,
    () => fetchWeddingInfoByUid(uid!),
  );

  useEffect(() => {
    if (data && setDeep) {
      setDeep(() => data);
    }
  }, [data, setDeep]);

  return {
    weddingInfo: data,
    isLoading,
    isError: !!error,
    notFound: !isLoading && shouldFetch && !data,
  };
};
