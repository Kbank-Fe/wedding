import { css, keyframes } from '@emotion/react';

import mainImage from '/images/image11.jpg';

const FullTheme = () => {
  const words = 'Our Wedding Day'.split(' ');
  const header1 = '2026년 6월 14일';
  const header2 = '오후 1시 20분';
  const header3 = '더 컨벤션 영등포';

  return (
    <section css={containerStyle}>
      <header css={headerStyle}>
        <h2>
          {header1}
          <br />
          {header2}
        </h2>
        <h3>{header3}</h3>
      </header>
      <figure>
        <img alt="Wedding main" css={imageStyle} src={mainImage} />
      </figure>
      <p css={fullTitleStyle}>
        {words.map((word, i) => (
          <span key={word} css={letterStyle(i)}>
            {word}
          </span>
        ))}
      </p>
    </section>
  );
};

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const headerStyle = css`
  position: absolute;
  color: var(--gray11);
  font-size: 14px;
  top: 6rem;
  text-align: center;

  h2 {
    line-height: 1.6rem;
  }

  h3 {
    margin-top: 1.5rem;
  }
`;

const imageStyle = css`
  height: 100vh;
  object-fit: cover;
`;

const smoothTyping = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
    clip-path: inset(0 100% 0 0);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    clip-path: inset(0 0 0 0);
  }
`;

const fullTitleStyle = css`
  position: absolute;
  color: var(--gray2);
  bottom: 4.5rem;
  font-family: 'Smooch', cursive;
  font-size: 90px;
  text-align: center;
  text-shadow: 0px 2px 7px rgba(94, 94, 94, 0.29);
  width: 100%;
  padding: 0 1rem;

  span {
    display: block;
    margin-top: -2rem;
  }
`;

const letterStyle = (i: number) => css`
  opacity: 0;
  animation: ${smoothTyping} 1.2s ease-out forwards;
  animation-delay: ${i * 0.3}s;
`;

export default FullTheme;
