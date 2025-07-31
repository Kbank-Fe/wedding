declare module 'react-image-gallery' {
  import * as React from 'react';

  export interface ImageGalleryItem {
    original: string;
    thumbnail?: string;
    description?: string;
    originalClass?: string;
    thumbnailClass?: string;
    renderItem?: () => React.ReactNode;
    renderThumbInner?: () => React.ReactNode;
  }

  export interface ImageGalleryProps {
    items: ImageGalleryItem[];
    startIndex?: number;
    showThumbnails?: boolean;
    showPlayButton?: boolean;
    showFullscreenButton?: boolean;
    slideOnThumbnailOver?: boolean;
    onSlide?: (index: number) => void;
    renderItem?: (item: ImageGalleryItem) => React.ReactNode;
    renderThumbInner?: (item: ImageGalleryItem) => React.ReactNode;
    additionalClass?: string;
    lazyLoad?: boolean;
    autoPlay?: boolean;
    showNav?: boolean;
    showBullets?: boolean;
    showIndex?: boolean;
    infinite?: boolean;
    disableSwipe?: boolean;
    onClick?: () => void;
    onImageLoad?: (
      event: React.SyntheticEvent<HTMLImageElement, Event>,
    ) => void;
    renderLeftNav?: (
      onClick: React.MouseEventHandler<HTMLElement>,
      disabled: boolean,
    ) => React.ReactNode;
    renderRightNav?: (
      onClick: React.MouseEventHandler<HTMLElement>,
      disabled: boolean,
    ) => React.ReactNode;
  }

  const ImageGallery: React.FC<ImageGalleryProps>;

  export default ImageGallery;
}
