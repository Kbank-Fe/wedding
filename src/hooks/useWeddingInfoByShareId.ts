import { useEffect } from 'react';
import useSWR from 'swr';

import type { WeddingInfo } from '@/types/wedding';
import { getShare } from '@/utils/shares';
import { isValidNanoId } from '@/utils/validateNanoId';

const fetchWeddingInfoByShareId = async (
  shareId: string,
): Promise<WeddingInfo | null> => {
  const doc = await getShare<WeddingInfo>(shareId);
  return doc?.data ?? null;
};

export const useWeddingInfoByShareId = (
  shareId: string | undefined,
  setDeep?: (fn: (draft: WeddingInfo) => void) => void,
) => {
  const valid = !!shareId && isValidNanoId(shareId);

  const { data, error, isLoading } = useSWR<WeddingInfo | null>(
    valid ? ['weddingInfoByShareId', shareId] : null,
    () => fetchWeddingInfoByShareId(shareId!),
  );

  useEffect(() => {
    if (data && setDeep) {
      setDeep((draft) => Object.assign(draft, data));
    }
  }, [data, setDeep]);

  return {
    weddingInfo: data,
    isLoading,
    isError: !!error,
    notFound: !valid || (!isLoading && valid && !data),
  };
};
