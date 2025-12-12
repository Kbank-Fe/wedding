import { css } from '@emotion/react';

import ImageSlideMotion from '@/components/shared/motion/ImageSlideMotion';
import { useImagePreview } from '@/hooks/useImagePreview';
import { useWeddingStore } from '@/stores/useWeddingStore';
import { getEnglishMonth } from '@/utils/date';

const CardSlideTheme = () => {
  const { text1, text2 } = useWeddingStore((state) => state.values.theme);
  const { maleName, femaleName } = useWeddingStore(
    (state) => state.values.basicInfo,
  );
  const { year, month, day } = useWeddingStore((state) => state.values.date);
  const { localImageList } = useWeddingStore(
    (state) => state.values.themeImage,
  );
  const imagePreviewList = useImagePreview(localImageList);

  return (
    <section css={containerStyle}>
      <figure css={figureStyle}>
        <ImageSlideMotion
          height="180px"
          images={imagePreviewList}
          width="180px"
        />
      </figure>
      <header css={nameWrapperStyle}>
        <h2>{maleName}</h2>
        <span aria-hidden="true">&</span>
        <h2>{femaleName}</h2>
      </header>
      <time css={dateStyle} dateTime="2025-05-27">
        <span>{day}</span>
        <span>{getEnglishMonth(month)}</span>
        <span>{year}</span>
      </time>
      <p css={subTextStyle}>
        {text1}
        <br />
        {text2}
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
