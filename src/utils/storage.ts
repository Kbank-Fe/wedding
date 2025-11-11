import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref as sRef,
  uploadBytes,
} from 'firebase/storage';

import { storage } from '@/utils/firebase';
import { compressImage } from '@/utils/image.ts';

export const uploadImageToStorage = async (
  file: File,
  uid: string,
  {
    folder = 'gallery',
    overwrite = false,
    compress = true,
  }: {
    folder?: string;
    overwrite?: boolean;
    compress?: boolean;
  } = {},
) => {
  const id = uid.replace(/^kakao:/, '');
  const dir = `${folder}/${id}`;
  const fileName = `${Date.now()}_${crypto.randomUUID()}.webp`;

  const blob = compress
    ? await compressImage(file, { maxWidth: 1920, quality: 0.8 })
    : file;

  const storageRef = sRef(storage, `${dir}/${fileName}`);

  if (overwrite) {
    const listRef = sRef(storage, dir);
    const { items } = await listAll(listRef);
    await Promise.all(items.map((item) => deleteObject(item)));
  }

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
