import { css } from '@emotion/react';
import { motion } from 'framer-motion';

import Line from '@/components/shared/Line';
import { useImagePreview } from '@/hooks/useImagePreview';
import { useWeddingStore } from '@/stores/useWeddingStore';
import { formatToAmPm } from '@/utils/constants/time';
import { getEnglishMonth } from '@/utils/date';

const MonochromeTheme = () => {
  const { year, month, day, hour, min } = useWeddingStore(
    (state) => state.values.date,
  );
  const { groomEnglishName, brideEnglishName } = useWeddingStore(
    (state) => state.values.theme,
  );
  const dateString = new Date(year, month - 1, day, hour, min).toISOString();
  const { localImageList } = useWeddingStore(
    (state) => state.values.themeImage,
  );
  const imagePreviewList = useImagePreview(localImageList);

  return (
    <section css={containerStyle}>
      <header css={headerStyle}>
        <time dateTime={dateString}>
          <p css={dayTextStyle}>{day}</p>
          <Line marginBottom={7} marginTop={0} />
          <p css={dateTextStyle}>
            {getEnglishMonth(month)} <span>{formatToAmPm(hour, min)}</span>
          </p>
        </time>
      </header>
      <motion.figure
        css={imageWrapperStyle}
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        viewport={{ amount: 0.2 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <img alt="Wedding main" css={imageStyle} src={imagePreviewList[0]} />
        <figcaption css={textStyle}>
          <h2>
            {groomEnglishName} <span>and</span> {brideEnglishName}
          </h2>
        </figcaption>
      </motion.figure>
    </section>
  );
};

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3.5rem;
  font-family: 'Instrument Serif', serif;
  font-weight: 400;
  font-style: normal;
  text-align: center;
  padding: 4rem 0 2rem;
`;

const headerStyle = css`
  width: 160px;
`;

const dayTextStyle = css`
  font-size: 60px;
`;

const dateTextStyle = css`
  font-size: 20px;
  letter-spacing: 0.02rem;
`;

const imageWrapperStyle = css`
  position: relative;
`;

const imageStyle = css`
  filter: grayscale(100%);
  transition: filter 0.4s ease;
  pointer-events: auto;

  &:hover {
    filter: grayscale(0%);
  }
`;

const textStyle = css`
  width: 100%;
  position: absolute;
  left: 50%;
  bottom: 30px;
  transform: translateX(-50%);
  color: var(--gray2);
  font-size: 22px;
  pointer-events: none;

  span {
    font-family: 'Kristi', cursive;
    font-weight: 400;
    font-style: normal;
    font-size: 17px;
    opacity: 0.8;
    margin: 0 4.7rem;
  }
`;

export default MonochromeTheme;
