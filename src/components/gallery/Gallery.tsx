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
  // 화면에 딱 맞게(fit) 시작하도록 설정
  initialZoomLevel: 'fit',
  // 최대 확대를 1배로 제한 (이미지 원본보다 커지지 않음)
  maxZoomLevel: 1,
  // 두 손가락으로 확대/축소하는 제스처 자체를 무효화
  pinchToClose: false,
  // 더블 탭 확대 방지 (타입 오류 방지를 위해 false 명시)
  doubleTapAction: false,
  // 이미지를 당겨서 다음 사진으로 넘어가는 동작 방지
  allowPanToNext: false,
  // 수직 드래그로 닫기 비활성화 (사진 위아래 움직이는 현상 방지)
  closeOnVerticalDrag: false,
  // 확대/축소 및 이동 시 발생하는 탄성(Bounce) 효과 제거
  zoomAnimationDuration: 0,
};

const Gallery = () => {
  const [expanded, setExpanded] = useState(false);
  const isPopup = usePreviewMode();

  const { localImageList } = useWeddingStore((state) => state.values.gallery);
  const { photoList } = usePhotoList(localImageList, 'actual');

  const showMoreButton = photoList.length > 9 && !expanded;
  const visiblePhotos = expanded ? photoList : photoList.slice(0, 9);

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
          {visiblePhotos.map((photo, index) => (
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
        <GalleryWrapper options={galleryWrapperOptions}>
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
  /* 좌우 스크롤만 허용 */
  .pswp__img {
    touch-action: pan-x !important;
  }
  /* 줌 제스처 시 발생하는 탄성 효과 강제 제거 */
  .pswp--zoomed-in .pswp__img {
    pointer-events: none;
  }
`;

export default Gallery;
