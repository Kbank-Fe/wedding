import { useEffect } from 'react';
import useSWR from 'swr';

import type { WeddingInfo } from '@/types/wedding';
import { initializeLocalImageList } from '@/utils/image';
import { getShare, getUserShareId } from '@/utils/shares';
import { isValidNanoId } from '@/utils/validateNanoId';

type Options = {
  uid?: string | null;
  shareId?: string | null;
};

const fetchWeddingInfo = async ({
  uid,
  shareId,
}: Options): Promise<WeddingInfo | null> => {
  // uid 우선
  if (uid) {
    const resolvedShareId = await getUserShareId(uid);
    if (!resolvedShareId) return null;
    const doc = await getShare<WeddingInfo>(resolvedShareId);
    return doc?.data ?? null;
  }

  // shareId로 직접 조회
  if (shareId && isValidNanoId(shareId)) {
    const doc = await getShare<WeddingInfo>(shareId);
    return doc?.data ?? null;
  }

  return null;
};

export const useWeddingInfo = (
  { uid, shareId }: Options,
  setDeep?: (fn: (draft: WeddingInfo) => void) => void,
) => {
  const valid = !!uid || (!!shareId && isValidNanoId(shareId));

  const { data, error, isLoading } = useSWR<WeddingInfo | null>(
    valid ? ['weddingInfo', uid, shareId] : null,
    () => fetchWeddingInfo({ uid: uid ?? null, shareId: shareId ?? null }),
  );

  useEffect(() => {
    if (!data || !setDeep) return;

    const setData = async () => {
      const localImageList = await initializeLocalImageList(
        data.gallery?.savedImageList,
      );

      setDeep((draft) => {
        Object.assign(draft, data);
        draft.gallery.localImageList = localImageList;
      });
    };

    setData();
  }, [data, setDeep]);

  return {
    weddingInfo: data,
    isLoading,
    isError: !!error,
    notFound: !valid || (!isLoading && valid && !data),
  };
};
