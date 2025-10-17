import { useEffect, useRef } from 'react';
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
  try {
    if (uid) {
      const resolvedShareId = await getUserShareId(uid);
      if (!resolvedShareId) return null;
      const doc = await getShare<WeddingInfo>(resolvedShareId);
      return doc?.data ?? null;
    }

    if (shareId && isValidNanoId(shareId)) {
      const doc = await getShare<WeddingInfo>(shareId);
      return doc?.data ?? null;
    }

    return null;
  } catch (err) {
    console.error('fetchWeddingInfo error:', err);
    return null;
  }
};

export const useWeddingInfo = (
  { uid, shareId }: Options,
  setDeep?: (fn: (draft: WeddingInfo) => void) => void,
) => {
  const key = uid
    ? ['weddingInfoByUid', uid]
    : shareId && isValidNanoId(shareId)
      ? ['weddingInfoByShareId', shareId]
      : null;

  const initializedRef = useRef(false);

  const { data, error, isLoading } = useSWR<WeddingInfo | null>(key, () =>
    fetchWeddingInfo({ uid: uid ?? null, shareId: shareId ?? null }),
  );

  useEffect(() => {
    if (!data || !setDeep || initializedRef.current) return;

    const setData = async () => {
      const localImageList = await initializeLocalImageList(
        data.gallery?.savedImageList,
      );

      setDeep((draft) => {
        Object.assign(draft, data);

        const localFiles = (draft.gallery.localImageList ?? []).filter(
          (img): img is File => img instanceof File,
        );

        draft.gallery.localImageList = [...localImageList, ...localFiles];
      });
      initializedRef.current = true;
    };

    setData();
  }, [data, setDeep]);

  return {
    weddingInfo: data,
    isLoading,
    isError: !!error,
    notFound: !isLoading && !data,
  };
};
