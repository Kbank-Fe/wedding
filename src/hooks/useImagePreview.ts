import { useEffect, useMemo } from 'react';

import type { LocalImage } from '@/types/wedding';

export const useImagePreview = (images: LocalImage[]) => {
  const imagePreviewList = useMemo(
    () =>
      images.map((img) =>
        img instanceof File ? URL.createObjectURL(img) : img.url,
      ),
    [images],
  );

  useEffect(() => {
    const currentPreviews = imagePreviewList;

    return () => {
      // unmount 시에만 실행되도록 보장
      currentPreviews.forEach((url) => {
        if (url.startsWith('blob:')) {
          // 렌더링 충돌 방지
          setTimeout(() => URL.revokeObjectURL(url), 1000);
        }
      });
    };
  }, [imagePreviewList]);

  return imagePreviewList;
};
