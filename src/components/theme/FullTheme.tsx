import { css, keyframes } from '@emotion/react';

import mainImage from '/images/image8.png';

const FullTheme = () => {
  const words = 'Our Wedding Day'.split(' ');
  const header1 = '2026년 6월 14일';
  const header2 = '오후 1시 20분';
  const header3 = '더 컨벤션 영등포';

  return (
    <div css={containerStyle}>
      <section css={sectionStyle}>
        <header>
          <h2 css={fullTextStyle('12%')}>{header1}</h2>
          <h2 css={fullTextStyle('15%')}>{header2}</h2>
          <h3 css={fullTextStyle('22%')}>{header3}</h3>
        </header>
        <figure>
          <img alt="Wedding main" css={fullImageStyle} src={mainImage} />
        </figure>
        <p css={fullTitleStyle}>
          {words.map((word, i) => (
            <span key={word} css={letterStyle(i)}>
              {word}
            </span>
          ))}
        </p>
      </section>
    </div>
  );
};

const containerStyle = css`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const sectionStyle = css`
  width: 100%;
  height: 100%;
  position: relative;
`;

const fullTextStyle = (top: string) => css`
  position: absolute;
  color: var(--gray2);
  top: ${top};
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
  font-weight: 100;
  z-index: 2;
`;

const fullImageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`;

const smoothTyping = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
    clip-path: inset(0 100% 0 0); /* 오른쪽에서부터 나타남 */
  }
  to {
    opacity: 1;
    transform: translateY(0);
    clip-path: inset(0 0 0 0);
  }
`;

const fullTitleStyle = css`
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  color: var(--gray2);
  font-size: 2.8rem;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0.9;
`;

const letterStyle = (i: number) => css`
  opacity: 0;
  animation: ${smoothTyping} 1.2s ease-out forwards;
  animation-delay: ${i * 0.3}s;
`;

export default FullTheme;
