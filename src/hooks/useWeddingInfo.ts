import { useEffect } from 'react';
import useSWR from 'swr';

import type { WeddingInfo } from '@/types/wedding';
import {
  type Folder,
  FOLDER_CONFIG,
  FOLDERS,
  type FolderSection,
} from '@/utils/constants/folder';
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

  const { data, error, isLoading } = useSWR<WeddingInfo | null>(
    key,
    () => fetchWeddingInfo({ uid: uid ?? null, shareId: shareId ?? null }),
    { revalidateOnFocus: false },
  );

  useEffect(() => {
    if (!data || !setDeep) return;

    const setData = async () => {
      setDeep((draft) => {
        FOLDERS.forEach((folder) => {
          type Section = FolderSection<Folder>;

          const section = (data[folder] ??
            WEDDING_INITIAL_INFO[folder]) as Section;

          const baseLocalImageList = initializeLocalImageList(
            section.savedImageList,
          );

          const preservedFiles =
            FOLDER_CONFIG[folder].multiple &&
            Array.isArray(draft[folder]?.localImageList)
              ? draft[folder].localImageList.filter(
                  (img): img is File => img instanceof File,
                )
              : [];

          const draftFolders = draft as Record<Folder, FolderSection<Folder>>;

          draftFolders[folder] = {
            ...section,
            localImageList: FOLDER_CONFIG[folder].multiple
              ? [...baseLocalImageList, ...preservedFiles]
              : baseLocalImageList,
          } as Section;
        });

        draft.theme = data.theme ?? WEDDING_INITIAL_INFO.theme;
        draft.activeCheckbox =
          data.activeCheckbox ?? WEDDING_INITIAL_INFO.activeCheckbox;
        draft.basicInfo = data.basicInfo ?? WEDDING_INITIAL_INFO.basicInfo;
        draft.intro = data.intro ?? WEDDING_INITIAL_INFO.intro;
        draft.contact = data.contact ?? WEDDING_INITIAL_INFO.contact;
        draft.date = data.date ?? WEDDING_INITIAL_INFO.date;
        draft.location = data.location ?? WEDDING_INITIAL_INFO.location;
        draft.transport = data.transport ?? WEDDING_INITIAL_INFO.transport;
        draft.account = data.account ?? WEDDING_INITIAL_INFO.account;
        draft.share = data.share ?? WEDDING_INITIAL_INFO.share;
      });
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
