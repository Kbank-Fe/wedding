import { useEffect, useState } from 'react';

import type { LocalImage } from '@/types/wedding';

type Photo = {
  src: string;
  width: number;
  height: number;
};

type Mode = 'fixed' | 'actual';

const MAX_SIZE = 700;

export const usePhotoList = (
  images: LocalImage[],
  mode: Mode = 'fixed',
  defaultWidth = 600,
  defaultHeight = 800,
) => {
  const [photoList, setPhotoList] = useState<Photo[]>([]);

  const applyMaxLimit = (width: number, height: number) => {
    const longerSide = Math.max(width, height);
    if (longerSide > MAX_SIZE) {
      const ratio = MAX_SIZE / longerSide;
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);
    }
    return { width, height };
  };

  useEffect(() => {
    if (!images || images.length === 0) {
      setPhotoList([]);
      return;
    }

    const urls = images.map((img) =>
      img instanceof File ? URL.createObjectURL(img) : img.url,
    );

    if (mode === 'fixed') {
      setPhotoList(
        urls.map((url) => {
          const { width, height } = applyMaxLimit(defaultWidth, defaultHeight);
          return { src: url, width, height };
        }),
      );
    } else {
      Promise.all(
        urls.map(
          (url) =>
            new Promise<Photo>((resolve) => {
              const img = new Image();
              img.onload = () => {
                const { width, height } = applyMaxLimit(img.width, img.height);
                resolve({ src: url, width, height });
              };
              img.onerror = () => {
                resolve({
                  src: url,
                  width: defaultWidth,
                  height: defaultHeight,
                });
              };
              img.src = url;
            }),
        ),
      ).then(setPhotoList);
    }

    return () => {
      images.forEach((img) => {
        if (img instanceof File) {
          const url = URL.createObjectURL(img);
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [images, mode, defaultWidth, defaultHeight]);

  return { photoList };
};
