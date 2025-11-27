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

export const mergeImageLists = async (
  serverSavedList: SavedImage[] | undefined,
  localList: (File | SavedImage)[] | undefined,
) => {
  const serverLocal = await initializeLocalImageList(serverSavedList ?? []);

  // 이미 로컬에서 업로드 대기 중이던 File만 필터링
  const pendingFiles = (localList ?? []).filter(
    (img): img is File => img instanceof File,
  );

  return {
    savedImageList: serverSavedList ?? [],
    localImageList: [...serverLocal, ...pendingFiles],
  };
};
