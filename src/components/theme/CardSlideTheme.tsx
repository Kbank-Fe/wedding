import { css } from '@emotion/react';

import ImageSlideMotion from '@/components/motion/ImageSlideMotion';

const images = [
  '/images/image1.png',
  '/images/image2.png',
  '/images/image3.png',
  '/images/image4.png',
  '/images/image5.png',
];

const CardSlideTheme = () => {
  return (
    <div css={containerStyle}>
      <ImageSlideMotion height="180px" images={images} width="180px" />
      <div css={nameWrapperStyle}>
        <h2>이규민</h2>
        <span>&</span>
        <h2>최종은</h2>
      </div>
      <p css={dateStyle}>
        27
        <span>May</span>
        2025
      </p>
      <p css={subTextStyle}>
        Please come to our wedding
        <br />
        and bless the start of our new live together
      </p>
    </div>
  );
};

const containerStyle = css`
  text-align: center;
  padding: 8rem 0 3rem;
`;

const nameWrapperStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 16px;
  margin: 4rem 0;

  h2 {
    letter-spacing: 0.3rem;
  }

  span {
    font-family: 'Alex Brush', cursive;
    font-weight: 400;
    font-style: normal;
    color: var(--gray10);
  }
`;

const dateStyle = css`
  font-size: 18px;
  font-weight: 500;
  margin: 2rem 0;

  span {
    margin: 0 0.6rem;
  }
`;

const subTextStyle = css`
  font-size: 14px;
  font-family: 'Instrument Serif', serif;
  font-weight: 400;
  font-style: normal;
  line-height: 1.3rem;
  color: var(--gray11);
  letter-spacing: 0.03rem;
`;

export default CardSlideTheme;
