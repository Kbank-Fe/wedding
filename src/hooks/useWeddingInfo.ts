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

      if (!resolvedShareId) {
        return WEDDING_INITIAL_INFO;
      }
      const doc = await getShare<WeddingInfo>(resolvedShareId);

      if (doc?.data) {
        return doc.data;
      }
      return WEDDING_INITIAL_INFO;
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

        draft.showCheckbox = data.showCheckbox ?? WEDDING_INITIAL_INFO.showCheckbox;
        draft.account = data.account ?? WEDDING_INITIAL_INFO.account;
        draft.contact = data.contact ?? WEDDING_INITIAL_INFO.contact;
        draft.date = data.date ?? WEDDING_INITIAL_INFO.date;
        draft.intro = data.intro ?? WEDDING_INITIAL_INFO.intro;
        draft.transport = data.transport ?? WEDDING_INITIAL_INFO.transport;
        draft.map = data.map ?? WEDDING_INITIAL_INFO.map;
      });

      initializedRef.current = true;
    };

    setData();
  }, [data, setDeep]);

  return {
    weddingInfo: data,
    isLoading: isLoading || !key,
    isError: !!error,
    notFound: !!key && !isLoading && data === null,
  };
};
