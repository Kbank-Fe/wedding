import { css } from '@emotion/react';

import ImageSlideMotion from '../motion/ImageSlideMotion';
import Sticker from '../shared/Sticker';

const images = [
  '/images/image1.png',
  '/images/image2.png',
  '/images/image3.png',
  '/images/image4.png',
  '/images/image5.png',
];

const RoundSlideTheme = () => {
  return (
    <div css={containerStyle}>
      <header css={headerStyle}>
        <div css={titleStyle}>
          Our
          <br />
          Wedding Day
        </div>
        <Sticker right="-10px" size="38px" top="-10px" />
      </header>

      <ImageSlideMotion
        height="360px"
        images={images}
        radius="170px"
        width="290px"
      />
      <p css={descriptionStyle}>Kyumin and Jongeun</p>
    </div>
  );
};

const containerStyle = css`
  padding: 5rem 2.5rem;
  color: var(--gray11);
`;

const headerStyle = css`
  position: relative;
  margin: 0 0.5rem 1.5rem;
`;

const titleStyle = css`
  font-family: 'Instrument Serif', serif;
  font-size: 42px;
  text-transform: uppercase;
  margin-left: 0.5rem;
`;

const descriptionStyle = css`
  font-family: 'Herr Von Muellerhoff', cursive;
  font-size: 20px;
  text-align: center;
  letter-spacing: 0.1rem;
  margin-top: 2rem;
  opacity: 0.8;
`;

export default RoundSlideTheme;
