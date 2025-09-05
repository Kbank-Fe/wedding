import { useEffect, useState } from 'react';

type Photo = {
  src: string;
  width: number;
  height: number;
};

type Mode = 'fixed' | 'actual';

const MAX_SIZE = 700;

export const usePhotoList = (
  files: File[],
  mode: Mode = 'fixed',
  defaultWidth = 600,
  defaultHeight = 800,
) => {
  const [photoList, setPhotoList] = useState<Photo[]>([]);

  const handleSetGalleryItems = (photos: Photo[]) =>
    photos.map(({ src }) => ({
      original: src,
      thumbnail: src,
    }));

  const applyMaxLimit = (width: number, height: number) => {
    const longerSide = Math.max(width, height);

    if (longerSide > MAX_SIZE) {
      const ratio = MAX_SIZE / longerSide;
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);
    }
    console.log(width, height);

    return { width, height };
  };

  useEffect(() => {
    if (!files || files.length === 0) {
      setPhotoList([]);
      return;
    }

    const urls = files.map((file) => URL.createObjectURL(file));

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
              img.src = url;
            }),
        ),
      ).then(setPhotoList);
    }

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files, mode, defaultWidth, defaultHeight]);

  return { photoList, handleSetGalleryItems };
};
