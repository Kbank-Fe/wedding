import { css } from '@emotion/react';

import ImageSlideMotion from '@/components/shared/motion/ImageSlideMotion';
import { useWeddingStore } from '@/stores/useWeddingStore';
import { getEnglishMonth } from '@/utils/date';

const images = [
  '/images/image1.png',
  '/images/image2.png',
  '/images/image3.png',
  '/images/image4.png',
  '/images/image5.png',
];

const CardSlideTheme = () => {
  const values = useWeddingStore((state) => state.values);
  return (
    <section css={containerStyle}>
      <figure css={figureStyle}>
        <ImageSlideMotion height="180px" images={images} width="180px" />
      </figure>
      <header css={nameWrapperStyle}>
        <h2>{values.basicInfo.maleName}</h2>
        <span aria-hidden="true">&</span>
        <h2>{values.basicInfo.femaleName}</h2>
      </header>
      <time css={dateStyle} dateTime="2025-05-27">
        <span>{values.date.day}</span>
        <span>{getEnglishMonth(values.date.month)}</span>
        <span>{values.date.year}</span>
      </time>
      <p css={subTextStyle}>
        {values.theme.mainPhrase}
        <br />
        {values.theme.subPhrase}
      </p>
    </section>
  );
};

const containerStyle = css`
  text-align: center;
  padding: 8rem 2.5rem 3rem;
`;

const figureStyle = css`
  margin: 0 auto;
  display: flex;
  justify-content: center;
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
    font-weight: 400;
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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
`;

const subTextStyle = css`
  font-size: 14px;
  font-family: 'Instrument Serif', serif;
  font-weight: 400;
  line-height: 1.4rem;
  letter-spacing: 0.03rem;
  opacity: 0.85;
  color: var(--gray11);
`;

export default CardSlideTheme;
