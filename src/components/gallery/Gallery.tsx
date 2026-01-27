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
  // 돋보기를 누르거나 더블탭했을 때 가는 '다음 배율'도 1배로 고정
  secondaryZoomLevel: 1,
  // 최대 확대를 1배로 제한 (이미지 원본보다 커지지 않음)
  maxZoomLevel: 1,
  // 두 손가락으로 확대/축소하는 제스처 자체를 무효화
  pinchToClose: false,
  // 더블 탭 확대 방지 (타입 오류 방지를 위해 false 명시)
  doubleTapAction: false,
  // 좌우 스와이프 허용
  allowPanToNext: true,
  wheelToZoom: false,
  // 수직 드래그로 닫기 비활성화 (사진 위아래 움직이는 현상 방지)
  closeOnVerticalDrag: false,
  // 확대/축소 및 이동 시 발생하는 탄성(Bounce) 효과 제거
  zoomAnimationDuration: 0,
  // 우측 상단 돋보기 버튼 제거
  zoom: false,
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
        <GalleryWrapper
          options={galleryWrapperOptions}
          onBeforeOpen={(pswpInstance) => {
            // 줌 동작이 시작되기 직전에 발생하는 이벤트
            pswpInstance.on('beforeZoomTo', (e) => {
              // 목적지 줌 레벨이 1보다 크면 확대를 시도하는 것이므로 차단
              if (e.destZoomLevel > 1) {
                e.preventDefault();
              }
            });
          }}
        >
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
  /* 1. 돋보기 버튼 숨기기 */
  .pswp__button--zoom {
    display: none !important;
  }

  /* 2. 줌 컨테이너의 움직임을 물리적으로 고정 */
  /* 수평(좌우) 이동은 PhotoSwipe 내부 로직에 맡기고, 
     그 외의 자유로운 드래그나 떨림을 CSS로 억제합니다. */
  .pswp__img {
    touch-action: pan-x !important; /* 오직 좌우 스와이프만 허용 */
    -webkit-user-drag: none; /* 이미지 드래그 방지 */
    user-select: none; /* 텍스트/이미지 선택 방지 */
    object-fit: contain; /* 비율 유지하며 화면 안에 안착 */
  }

  /* 3. 확대 시도 시 레이아웃이 어긋나지 않도록 강제 고정 */
  .pswp--zoomed-in .pswp__zoom-container {
    transform: translate3d(0, 0, 0) !important;
  }
`;

export default Gallery;
