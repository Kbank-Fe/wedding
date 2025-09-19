import { getDownloadURL, ref as sRef, uploadBytes } from 'firebase/storage';

import { storage } from '@/utils/firebase';
import { compressImage } from '@/utils/image.ts';

const PREFIX = 'kakao:';

export const uploadImageToStorage = async (file: File, uid: string) => {
  const blob = await compressImage(file, { maxWidth: 1920, quality: 0.8 });

  const fileName = `${Date.now()}_${crypto.randomUUID()}.webp`;

  let id = '';
  if (uid.includes(PREFIX)) {
    id = uid.replaceAll(PREFIX, '');
  }
  const path = `gallery/${id}/${fileName}`;
  const storageRef = sRef(storage, path);

  await uploadBytes(storageRef, blob, { contentType: blob.type });
  const url = await getDownloadURL(storageRef);

  return {
    url,
    name: file.name,
    size: blob.size,
    type: blob.type,
    createdAt: Date.now(),
  };
};
