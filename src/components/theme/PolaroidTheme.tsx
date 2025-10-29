import { css } from '@emotion/react';
import { motion } from 'framer-motion';

import mainImage from '/images/image2.png';

const PolaroidTheme = () => {
  return (
    <motion.section
      css={containerStyle}
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      viewport={{ amount: 0.2 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <header css={headerStyle}>
        <h1>
          KYUMIN <span>and</span> JONGEUN
        </h1>
      </header>
      <figure css={polariodStyle}>
        <div css={stickerStyle} />
        <img alt="Wedding main" src={mainImage} />
        <figcaption css={photoTextStyle}>Our Wedding Day</figcaption>
        <p css={photoSubTextStyle}>A day made with love</p>
      </figure>

      <p css={subTextStyle}>The day we become one</p>
    </motion.section>
  );
};

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
`;

const headerStyle = css`
  text-align: center;
  font-weight: 400;
  font-style: normal;

  h1 {
    margin-bottom: 0.2rem;
    font-size: 55px;
    font-family: 'Instrument Serif', serif;
  }

  span {
    display: block;
    margin-bottom: 0.2rem;
    font-size: 40px;
    font-family: 'Kristi', cursive;
    opacity: 0.8;
  }
`;

const polariodStyle = css`
  width: 90%;
  height: fit-content;
  background: var(--gray12);
  padding: 2.2rem;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
  position: relative;
`;

const stickerStyle = css`
  position: absolute;
  top: -19px;
  left: -15px;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: var(--gray5);
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
`;

const photoTextStyle = css`
  font-family: 'Kristi', cursive;
  font-weight: 400;
  font-style: normal;
  color: var(--gray6);
  font-size: 33px;
  text-align: center;
  opacity: 0.8;
  letter-spacing: 0.1rem;
  margin-top: 1.8rem;
`;

const photoSubTextStyle = css`
  position: absolute;
  top: 65px;
  right: -123px;
  font-family: 'Instrument Serif', serif;
  font-weight: 400;
  font-style: normal;
  font-size: 10px;
  letter-spacing: 0.16rem;
  text-transform: uppercase;
  color: var(--gray7);
  transform: rotate(90deg);
  transform-origin: left top;
  opacity: 0.8;
`;

const subTextStyle = css`
  font-family: 'Instrument Serif', serif;
  font-weight: 400;
  font-style: normal;
  color: var(--gray11);
  text-transform: uppercase;
  letter-spacing: 0.07rem;
  font-size: 13px;
`;

export default PolaroidTheme;
