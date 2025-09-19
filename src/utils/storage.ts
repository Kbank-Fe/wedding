import { getDownloadURL, ref as sRef, uploadBytes } from 'firebase/storage';

import { storage } from '@/utils/firebase';
import { compressImage } from '@/utils/image.ts';

export const uploadImageToStorage = async (
  file: File,
  shareId: string,
  albumId = 'default',
) => {
  const blob = await compressImage(file, { maxWidth: 1920, quality: 0.8 });

  const fileName = `${Date.now()}_${crypto.randomUUID()}.webp`;
  const path = `shares/${shareId}/images/${albumId}/${fileName}`;
  const storageRef = sRef(storage, path);

  await uploadBytes(storageRef, blob, { contentType: blob.type });
  const url = await getDownloadURL(storageRef);

  return {
    url,
    name: file.name,
    size: blob.size,
    type: blob.type,
    createdAt: Date.now(),
    albumId,
  };
};
