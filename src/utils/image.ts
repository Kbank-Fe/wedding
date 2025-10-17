import type { SavedImage } from '@/types/wedding';

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

// 서버에서 불러온 savedImageList를 그대로 localImageList로 반환
export const initializeLocalImageList = (
  savedImageList: SavedImage[] = [],
): (File | SavedImage)[] => {
  return savedImageList;
};
