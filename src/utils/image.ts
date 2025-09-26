import type { SavedImage } from '@/types/wedding';

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
  const bitmap = await createImageBitmap(file);

  const scale = Math.min(1, maxWidth / bitmap.width);
  const canvas = document.createElement('canvas');
  canvas.width = Math.floor(bitmap.width * scale);
  canvas.height = Math.floor(bitmap.height * scale);

  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

  const blob: Blob = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b!), outputType, quality),
  );

  return blob!;
};

export const urlToFile = async (saved: SavedImage): Promise<File> => {
  const res = await fetch(saved.url);
  const blob = await res.blob();
  return new File([blob], saved.name, {
    type: saved.type,
    lastModified: saved.createdAt,
  });
};

export const initializeLocalImageList = async (
  savedImageList: SavedImage[] = [],
): Promise<File[]> => {
  if (!savedImageList.length) return [];
  return Promise.all(savedImageList.map((img) => urlToFile(img)));
};
