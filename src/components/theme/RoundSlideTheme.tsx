import { css } from '@emotion/react';

import ImageSlideMotion from '@/components/shared/motion/ImageSlideMotion';
import Sticker from '@/components/shared/Sticker';

const images = [
  '/images/image1.png',
  '/images/image2.png',
  '/images/image3.png',
  '/images/image4.png',
  '/images/image5.png',
];

const RoundSlideTheme = () => {
  return (
    <section css={containerStyle}>
      <header css={headerStyle}>
        <h1 css={titleStyle}>
          Our <br /> Wedding Day
        </h1>
        <Sticker right="-10px" size="38px" top="-10px" />
      </header>
      <figure css={figureStyle}>
        <ImageSlideMotion
          height="360px"
          images={images}
          radius="170px"
          width="300px"
        />
        <figcaption css={descriptionStyle}>Kyumin and Jongeun</figcaption>
      </figure>
    </section>
  );
};

const containerStyle = css`
  padding: 5rem 0;
  color: var(--gray11);
`;

const headerStyle = css`
  position: relative;
  margin: 0 3rem 1.5rem;
`;

const titleStyle = css`
  font-family: 'Instrument Serif', serif;
  font-size: 42px;
  text-transform: uppercase;
  margin-left: 0.5rem;
`;

const figureStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const descriptionStyle = css`
  font-family: 'Herr Von Muellerhoff', cursive;
  font-size: 20px;
  text-align: center;
  letter-spacing: 0.1rem;
  opacity: 0.8;
`;

export default RoundSlideTheme;
