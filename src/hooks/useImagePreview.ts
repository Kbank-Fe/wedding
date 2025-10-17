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
    return () => {
      images.forEach((image, index) => {
        if (image instanceof File) {
          try {
            URL.revokeObjectURL(imagePreviewList[index]);
          } catch (error) {
            console.warn('revokeObjectURL 실패:', error);
          }
        }
      });
    };
  }, [images, imagePreviewList]);

  return imagePreviewList;
};
