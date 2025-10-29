import { css } from '@emotion/react';
import { motion } from 'framer-motion';

import mainImage from '/images/image7.png';
import Line from '@/components/shared/Line';

const MonochromeTheme = () => {
  return (
    <section css={containerStyle}>
      <header css={headerStyle}>
        <time dateTime="2025-05-27T12:00">
          <p css={dayTextStyle}>27</p>
          <Line marginBottom={7} marginTop={0} />
          <p css={dateTextStyle}>
            MAY <span>PM 12:00</span>
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
        <img alt="Wedding main" css={imageStyle} src={mainImage} />
        <figcaption css={textStyle}>
          <h2>
            JONGEUN <span>and</span> KYUMIN
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
  margin: 0 -2.5rem;
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
