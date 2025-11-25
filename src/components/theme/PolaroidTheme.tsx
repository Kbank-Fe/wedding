import { css } from '@emotion/react';

// import { useEffect, useState } from 'react';
import mainImage from '/images/image2.png';
import Sticker from '@/components/shared/Sticker';
// import TypingOverlay from '@/components/theme/TypingOverlay';
import { useWeddingStore } from '@/stores/useWeddingStore';
// import { getEnglishMonth } from '@/utils/date';

const PolaroidTheme = () => {
  const values = useWeddingStore((state) => state.values);
  // const [showIntro, setShowIntro] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowIntro(false);
  //   }, 1800);
  //   return () => clearTimeout(timer);
  // }, []);

  // TODO: overlay 컴포넌트 분리 및 관리자 영역 추가 필요
  // const introTitle = "We're getting Married";
  // const introSubtitle = `${getEnglishMonth(values.date.month)} ${values.date.day}, ${values.date.year}`;

  return (
    <div css={containerStyle}>
      {/* <TypingOverlay
        show={showIntro}
        subtitle={introSubtitle}
        title={introTitle}
      /> */}
      <section css={sectionStyle}>
        <header css={headerStyle}>
          <h1>
            {values.theme.groomEnglishName} <span>and</span>{' '}
            {values.theme.brideEnglishName}
          </h1>
        </header>

        <figure css={polaroidStyle}>
          <Sticker left="-15px" top="-19px" />
          <img alt="Wedding main" src={mainImage} />
          <figcaption css={photoTextStyle}>
            {values.theme.mainPhrase}
          </figcaption>
          <p css={photoSubTextStyle}>A day made with love</p>
        </figure>

        <p css={subTextStyle}>{values.theme.subPhrase}</p>
      </section>
    </div>
  );
};

const containerStyle = css`
  padding: 4.5rem 2.5rem 1rem;
`;

const sectionStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.7rem;
`;

const headerStyle = css`
  text-align: center;
  font-weight: 400;
  font-style: normal;

  h1 {
    font-size: 55px;
    font-family: 'Instrument Serif', serif;
  }

  span {
    display: block;
    font-size: 40px;
    font-family: 'Kristi', cursive;
    opacity: 0.8;
  }
`;

const polaroidStyle = css`
  width: 90%;
  background: var(--gray12);
  padding: 2.2rem;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  position: relative;
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
  color: var(--gray11);
  text-transform: uppercase;
  letter-spacing: 0.07rem;
  font-size: 13px;
`;

export default PolaroidTheme;
