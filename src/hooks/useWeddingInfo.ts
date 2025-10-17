import { useEffect, useRef } from 'react';
import useSWR from 'swr';

import type { WeddingInfo } from '@/types/wedding';
import { WEDDING_INITIAL_INFO } from '@/utils/constants/wedding';
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
      return doc?.data ?? WEDDING_INITIAL_INFO;
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
  const key =
    uid && typeof uid === 'string'
      ? ['weddingInfoByUid', uid]
      : shareId && isValidNanoId(shareId)
        ? ['weddingInfoByShareId', shareId]
        : null;

  const initializedRef = useRef(false);

  const { data, error, isLoading } = useSWR<WeddingInfo | null>(
    key,
    () => fetchWeddingInfo({ uid: uid ?? null, shareId: shareId ?? null }),
    { revalidateOnFocus: false },
  );

  useEffect(() => {
    if (!data || !setDeep || initializedRef.current) return;

    const setData = async () => {
      const localImageList = await initializeLocalImageList(
        data.gallery?.savedImageList,
      );

      setDeep((draft) => {
        const localFiles = (draft.gallery?.localImageList ?? []).filter(
          (img): img is File => img instanceof File,
        );
        draft.gallery = {
          ...(data.gallery ?? {}),
          localImageList: [...localImageList, ...localFiles],
        };
      });
      initializedRef.current = true;
    };

    setData();
  }, [data, setDeep]);

  return {
    weddingInfo: data,
    isLoading: isLoading || !key, // key 없으면 로딩 처리 유지
    isError: !!error,
    notFound: !!key && !isLoading && !data, // key 존재할 때만 notFound 판단
  };
};
