// libs/uploadImageRTDB.ts
import { push, ref as dRef, set } from 'firebase/database';
import { getDownloadURL, ref as sRef, uploadBytes } from 'firebase/storage';

import { db, storage } from '@/utils/firebase';
import { compressImage } from '@/utils/image.ts';

export async function uploadImageAndSaveMetaRTDB(
  uid: string,
  file: File,
  albumId = 'default',
) {
  // 1. 압축
  const blob = await compressImage(file, { maxWidth: 1920, quality: 0.8 });

  // 2. Storage 업로드
  const fileName = `${Date.now()}_${crypto.randomUUID()}.webp`;
  const path = `users/${uid}/images/${albumId}/${fileName}`;
  const storageRef = sRef(storage, path);

  await uploadBytes(storageRef, blob, { contentType: blob.type });
  const url = await getDownloadURL(storageRef);

  // 3. 메타데이터
  const meta = {
    url,
    name: file.name,
    size: blob.size,
    type: blob.type,
    createdAt: Date.now(),
    albumId,
  };

  // 4. RTDB에 저장
  const listRef = dRef(db, `users/${uid}/images/${albumId}`);
  const newItemRef = push(listRef);
  await set(newItemRef, meta);

  return meta;
}
