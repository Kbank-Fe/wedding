import { css, keyframes } from '@emotion/react';

import { useLocalImagePreviewList } from '@/hooks/useLocalImagePreviewList';
import { useWeddingStore } from '@/stores/useWeddingStore';
import { getHourTitle, getMinuteTitle } from '@/utils/date';

const FullTheme = () => {
  const { text1, text2, text3 } = useWeddingStore(
    (state) => state.values.theme,
  );
  const { year, month, day, hour, min } = useWeddingStore(
    (state) => state.values.date,
  );
  const { address } = useWeddingStore((state) => state.values.location);

  const imagePreviewList = useLocalImagePreviewList('themeImage', 'FULL');

  const header1 = `${year}년 ${month}월 ${day}일`;
  const header2 = `${getHourTitle(hour)} ${getMinuteTitle(min)}`;
  const header3 = address;

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
      <figure css={imageContainerStyle(imagePreviewList[0])} />
      <p css={fullTitleStyle}>
        <span css={letterStyle(0)}>{text1}</span>
        <span css={letterStyle(1)}>{text2}</span>
        <span css={letterStyle(2)}>{text3}</span>
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

const imageContainerStyle = (src?: string) => css`
  width: 100%;
  height: 100vh;
  background-image: url(${src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

// const imageStyle = css`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   display: block;
// `;

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
