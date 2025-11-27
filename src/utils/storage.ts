import { getDownloadURL, ref as sRef, uploadBytes } from 'firebase/storage';

import { useWeddingStore } from '@/stores/useWeddingStore';
import type { SavedImage } from '@/types/wedding';
import { storage } from '@/utils/firebase';
import { compressImage } from '@/utils/image.ts';

type Folder = 'gallery' | 'share';

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

export const uploadAndSyncImages = async (
  section: 'gallery' | 'share',
  uid: string,
) => {
  const state = useWeddingStore.getState().values[section];
  const saved = state.savedImageList ?? [];
  const local = state.localImageList ?? [];

  const filesToUpload = local.filter((img): img is File => img instanceof File);

  if (filesToUpload.length === 0) return;

  const uploadedMetas: SavedImage[] = [];

  for (const file of filesToUpload) {
    try {
      const meta = await uploadImageToStorage(file, uid, section);
      uploadedMetas.push(meta);
    } catch (error) {
      console.error(`업로드 실패(${section})`, error);
      throw new Error(`upload_failed_${section}`);
    }
  }

  useWeddingStore.setState((draft) => {
    draft.values[section].savedImageList = [...saved, ...uploadedMetas];
    draft.values[section].localImageList = [];
  });
};
