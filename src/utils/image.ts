import { getDownloadURL, ref as sRef, uploadBytes } from 'firebase/storage';

import { useWeddingStore } from '@/stores/useWeddingStore';
import type { Folder, SavedImage, WeddingInfo } from '@/types/wedding';
import { storage } from '@/utils/firebase';

import { FOLDER_CONFIG } from './constants/wedding';

// 이미지 압축: File → Blob 변환 (저장 전 용도)
export const compressImage = async (
  file: File,
  {
    maxWidth = 1920,
    quality = 0.8,
    outputType = 'image/webp',
  }: {
    maxWidth?: number;
    quality?: number;
    outputType?: 'image/webp' | 'image/jpeg';
  } = {},
): Promise<Blob> => {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = reject;
    el.src = URL.createObjectURL(file);
  });

  const scale = Math.min(1, maxWidth / img.width);
  const width = Math.round(img.width * scale);
  const height = Math.round(img.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('canvas context 생성 실패');
  ctx.drawImage(img, 0, 0, width, height);

  const type = canvas.toDataURL(outputType).startsWith('data:image/webp')
    ? outputType
    : 'image/jpeg';

  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('blob 변환 실패'))),
      type,
      quality,
    );
  });

  URL.revokeObjectURL(img.src);
  return blob;
};

// 서버에서 불러온 savedImageList를 그대로 localImageList로 반환
export const initializeLocalImageList = (
  savedImageList: SavedImage[] = [],
): (File | SavedImage)[] => {
  return savedImageList;
};

export const uploadImageToStorage = async (
  file: File,
  uid: string,
  folder: Folder,
) => {
  const blob = await compressImage(file, { maxWidth: 1920, quality: 0.8 });
  const fileName = `${Date.now()}_${crypto.randomUUID()}.webp`;

  const id = uid.replace(/^kakao:/, '');
  const path = `${folder}/${id}/${fileName}`;
  const storageRef = sRef(storage, path);

  await uploadBytes(storageRef, blob, { contentType: blob.type });
  const url = await getDownloadURL(storageRef);

  return {
    url,
    name: file.name,
    size: file.size,
    type: blob.type,
    createdAt: Date.now(),
  };
};

export const processFolderImages = async <F extends Folder>(
  uid: string,
  folder: F,
  setDeep: (fn: (draft: WeddingInfo) => void) => void,
) => {
  const state = useWeddingStore.getState().values[folder];

  const savedList = state.savedImageList ?? [];
  const localList = state.localImageList ?? [];

  const addedFiles = localList.filter(
    (img): img is File => img instanceof File,
  );

  const deletedSavedImages = savedList.filter(
    (saved) =>
      !localList.some((img) => !(img instanceof File) && img.url === saved.url),
  );

  return Promise.all(
    addedFiles.map((file) => uploadImageToStorage(file, uid, folder)),
  ).then((metas) => {
    const { multiple } = FOLDER_CONFIG[folder];

    setDeep((draft) => {
      const folderDraft = draft[folder];

      const updated = [
        ...savedList.filter(
          (img) => !deletedSavedImages.some((del) => del.url === img.url),
        ),
        ...metas,
      ];

      folderDraft.savedImageList = multiple ? updated : updated.slice(-1);
    });
  });
};
