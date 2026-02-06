import 'photoswipe/style.css';

import { css, Global } from '@emotion/react';
import { AnimatePresence, motion } from 'framer-motion';
import type { PhotoSwipeOptions } from 'photoswipe';
import { useState } from 'react';
import { ImHeart } from 'react-icons/im';
import { Gallery as GalleryWrapper, Item } from 'react-photoswipe-gallery';
import { toast } from 'sonner';

import { usePreviewMode } from '@/contexts/PreviewModeContext';
import { usePhotoList } from '@/hooks/usePhotoList';
import { useWeddingStore } from '@/stores/useWeddingStore';

const galleryWrapperOptions: PhotoSwipeOptions = {
  initialZoomLevel: 'fit',
  secondaryZoomLevel: 'fit',
  maxZoomLevel: 'fit',

  allowPanToNext: true,
  pinchToClose: false,
  wheelToZoom: false,
  closeOnVerticalDrag: false,
  zoom: false,
  doubleTapAction: false,
  zoomAnimationDuration: 0,
};

const Gallery = () => {
  const [expanded, setExpanded] = useState(false);
  const isPopup = usePreviewMode();

  const { localImageList } = useWeddingStore((state) => state.values.gallery);
  const { photoList } = usePhotoList(localImageList, 'actual');

  const showMoreButton = photoList.length > 9 && !expanded;

  const galleryList = (
    <>
      <motion.div
        animate={{ maxHeight: expanded ? '100%' : '60vh' }}
        css={wrapperStyle}
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        viewport={{ amount: 0.2, once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div css={gridStyle}>
          {photoList.map((photo, index) => (
            <Item
              key={index}
              height={photo.height}
              original={photo.src}
              thumbnail={photo.src}
              width={photo.width}
            >
              {({ ref, open }) => (
                <button
                  ref={ref}
                  css={buttonStyle}
                  onClick={(event) => {
                    if (isPopup) {
                      event.preventDefault();
                      toast.warning(
                        '모바일 미리보기에서는 갤러리 기능이 제공되지 않아요. 저장 후 확인해주세요.',
                      );
                    } else {
                      open(event);
                    }
                  }}
                >
                  <img
                    alt={`image-${index}`}
                    css={thumbStyle}
                    src={photo.src}
                  />
                </button>
              )}
            </Item>
          ))}
        </div>
        <AnimatePresence>
          {showMoreButton && (
            <motion.div
              css={fadeOverlayStyle}
              exit={{ opacity: 0 }}
              initial={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>
      </motion.div>
      {showMoreButton && (
        <button css={moreButtonStyle} onClick={() => setExpanded(true)}>
          더보기
        </button>
      )}
    </>
  );

  return (
    <>
      <Global styles={pswpCustomStyle} />

      <ImHeart color="#87BBBA" css={iconStyle} size={16} />
      {isPopup ? (
        galleryList
      ) : (
        <GalleryWrapper options={galleryWrapperOptions} onBeforeOpen={() => {}}>
          {galleryList}
        </GalleryWrapper>
      )}
    </>
  );
};

const iconStyle = css`
  color: var(--gray6);
  margin: 0 auto 5rem;
`;

const wrapperStyle = css`
  position: relative;
  overflow: hidden;
`;

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

const buttonStyle = css`
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  display: block;
`;

const thumbStyle = css`
  width: 100%;
  height: 145px;
  object-fit: cover;
`;

const fadeOverlayStyle = css`
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(250, 250, 250, 0) 0%, #f8f6f1 93%);
  pointer-events: none;
`;

const moreButtonStyle = css`
  padding: 1rem 0;
  color: var(--gray8);
  font-family: 'Wedding';
  font-size: 12px;
`;

const pswpCustomStyle = css`
  .pswp,
  .pswp__scroll-wrap,
  .pswp__container {
    touch-action: pan-x !important;
  }

  .pswp__zoom-wrap {
    position: relative;
  }

  .pswp__zoom-wrap::after {
    content: '';
    position: absolute;
    inset: 0;
    background: transparent;

    pointer-events: auto;
    touch-action: none;
  }
`;

export default Gallery;
