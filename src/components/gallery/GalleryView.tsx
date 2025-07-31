import 'react-photo-album/columns.css';
import 'react-image-gallery/styles/css/image-gallery.css';

import { css } from '@emotion/react';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import PhotoAlbum from 'react-photo-album';

const photoList = [
  { src: '/images/image1.png', width: 600, height: 800 },
  { src: '/images/image2.png', width: 600, height: 800 },
  { src: '/images/image3.png', width: 600, height: 800 },
  { src: '/images/image4.png', width: 600, height: 800 },
  { src: '/images/image5.png', width: 600, height: 800 },
  { src: '/images/image6.png', width: 600, height: 800 },
  { src: '/images/image7.png', width: 600, height: 800 },
  { src: '/images/image8.png', width: 600, height: 800 },
  { src: '/images/image9.png', width: 600, height: 800 },
  { src: '/images/image10.png', width: 600, height: 800 },
];

type Photo = {
  src: string;
  width: number;
  height: number;
};

const toGalleryItems = (photos: Photo[]) =>
  photos.map(({ src }) => ({
    original: src,
    thumbnail: src,
  }));

const GalleryView = () => {
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const handleClick = ({ index }: { index: number }) => {
    setStartIndex(index);
    setOpen(true);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.2 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <PhotoAlbum
          columns={3}
          layout="columns"
          photos={photoList.slice(0, 9)}
          spacing={10}
          onClick={handleClick}
        />
      </motion.div>
      <AnimatePresence>
        {open && (
          <Dialog.Portal>
            <Dialog.Overlay css={overlayStyle} />
            <Dialog.Content asChild forceMount>
              <motion.div
                animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                css={contentStyle}
                exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
                initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
                transition={{ duration: 0.3 }}
              >
                <Dialog.Close asChild>
                  <button css={closeButtonStyle}>
                    <X color="white" />
                  </button>
                </Dialog.Close>
                <ImageGallery
                  items={toGalleryItems(photoList)}
                  lazyLoad={true}
                  showFullscreenButton={false}
                  showPlayButton={false}
                  showThumbnails={true}
                  slideOnThumbnailOver={true}
                  startIndex={startIndex}
                />
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

const overlayStyle = css`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 50;
`;

const contentStyle = css`
  position: fixed;
  top: 50%;
  left: 50%;
  background: var(--gray12);
  max-width: 90vw;
  max-height: 90vh;
  width: 100%;
  height: 100%;
  padding: 0;
  overflow: hidden;
  z-index: 100;
  border-radius: 8px;
`;

const closeButtonStyle = css`
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
  z-index: 10;
`;

export default GalleryView;
