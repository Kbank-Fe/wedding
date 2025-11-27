import { useEffect, useRef } from 'react';
import useSWR from 'swr';

import { useWeddingStore } from '@/stores/useWeddingStore';
import type { WeddingInfo } from '@/types/wedding';
import { WEDDING_INITIAL_INFO } from '@/utils/constants/wedding';
import { mergeImageLists } from '@/utils/image';
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
      // 현재 스토어의 로컬 파일 목록 가져오기
      const currentGalleryLocal =
        useWeddingStore.getState().values.gallery.localImageList;
      const currentShareLocal =
        useWeddingStore.getState().values.share.localImageList;

      const mergedGallery = await mergeImageLists(
        data.gallery?.savedImageList,
        currentGalleryLocal,
      );

      const mergedShare = await mergeImageLists(
        data.share?.savedImageList,
        currentShareLocal,
      );

      setDeep((draft) => {
        draft.gallery = {
          ...data.gallery,
          ...mergedGallery,
        };

        draft.share = {
          ...data.share,
          ...mergedShare,
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
