import { css } from '@emotion/react';
import { ImHeart } from 'react-icons/im';

import GalleryView from '@/components/gallery/GalleryView';

const Gallery = () => {
  return (
    <>
      <ImHeart css={iconStyle} />
      <GalleryView />
    </>
  );
};

const iconStyle = css`
  color: var(--gray6);
  margin: 0 auto 6.5rem;
`;

export default Gallery;
