import 'photoswipe/style.css';

import { css } from '@emotion/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { ImHeart } from 'react-icons/im';
import { Gallery as GalleryWrapper, Item } from 'react-photoswipe-gallery';

import { usePhotoList } from '@/hooks/usePhotoList';
import { useWeddingStore } from '@/stores/useWeddingStore';

const Gallery = () => {
  const [expanded, setExpanded] = useState(false);

  const { localImageList } = useWeddingStore((state) => state.values.gallery);
  const { photoList } = usePhotoList(localImageList, 'actual');

  const showMoreButton = photoList.length > 9 && !expanded;
  const visiblePhotos = expanded ? photoList : photoList.slice(0, 9);

  return (
    <>
      <ImHeart color="#87BBBA" css={iconStyle} size={16} />
      <GalleryWrapper>
        <motion.div
          animate={{ maxHeight: expanded ? '100%' : '60vh' }}
          css={wrapperStyle}
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          viewport={{ amount: 0.2 }}
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
                  <button ref={ref} css={buttonStyle} onClick={open}>
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
      </GalleryWrapper>
    </>
  );
};

const iconStyle = css`
  color: var(--gray6);
  margin: 0 auto 6.5rem;
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

export default Gallery;
