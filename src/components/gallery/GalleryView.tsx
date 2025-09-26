import 'photoswipe/style.css';

import { css } from '@emotion/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';

import { usePhotoList } from '@/hooks/usePhotoList';
import { useWeddingStore } from '@/stores/useWeddingStore';

const GalleryView = () => {
  const [expanded, setExpanded] = useState(false);

  const { localImageList } = useWeddingStore((state) => state.values.gallery);
  const { photoList } = usePhotoList(localImageList, 'actual');

  const showMoreButton = photoList.length > 9 && !expanded;
  const visiblePhotos = expanded ? photoList : photoList.slice(0, 9);

  return (
    <Gallery>
      <motion.div
        animate={{ maxHeight: expanded ? '100%' : '60vh' }}
        css={wrapperStyle}
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        viewport={{ once: true, amount: 0.2 }}
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
          {!expanded && (
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
    </Gallery>
  );
};

const wrapperStyle = css`
  position: relative;
  overflow: hidden;
`;

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  background-color: var(--gray1);
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
  height: 150px;
  object-fit: cover;
  background-color: var(--gray1);
`;

const fadeOverlayStyle = css`
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(250, 250, 250, 0) 0%, var(--gray1) 93%);
  pointer-events: none;
`;

const moreButtonStyle = css`
  margin-top: 1rem;
  width: 100%;
  text-align: center;
  padding: 8px 0;
  border-radius: 6px;
  color: var(--gray8);
  cursor: pointer;
`;

export default GalleryView;
