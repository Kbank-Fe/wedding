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
      if (!resolvedShareId) return WEDDING_INITIAL_INFO;

      const doc = await getShare<WeddingInfo>(resolvedShareId);
      return doc?.data ?? WEDDING_INITIAL_INFO;
    }

    if (shareId) {
      if (!isValidNanoId(shareId)) {
        return null;
      }
      const doc = await getShare<WeddingInfo>(shareId);
      if (!doc) {
        return null;
      }
      return doc.data ?? null;
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
      : shareId
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

      const localImageList2 = await initializeLocalImageList(
        data.share?.savedImageList,
      );

      setDeep((draft) => {
        const localFiles = (draft.gallery?.localImageList ?? []).filter(
          (img): img is File => img instanceof File,
        );

        draft.gallery = {
          ...(data.gallery ?? {}),
          localImageList: [...localImageList, ...localFiles],
        };

        const localFiles2 = (draft.share?.localImageList ?? []).filter(
          (img): img is File => img instanceof File,
        );

        draft.share = {
          ...(data.share ?? {}),
          localImageList: [...localImageList2, ...localFiles2],
        };

        draft.showCheckbox =
          data.showCheckbox ?? WEDDING_INITIAL_INFO.showCheckbox;
        draft.account = data.account ?? WEDDING_INITIAL_INFO.account;
        draft.contact = data.contact ?? WEDDING_INITIAL_INFO.contact;
        draft.date = data.date ?? WEDDING_INITIAL_INFO.date;
        draft.intro = data.intro ?? WEDDING_INITIAL_INFO.intro;
        draft.transport = data.transport ?? WEDDING_INITIAL_INFO.transport;
        draft.location = data.location ?? WEDDING_INITIAL_INFO.location;
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
