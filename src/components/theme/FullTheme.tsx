import { css, keyframes } from '@emotion/react';

import mainImage from '/images/image8.png';
import { MotionFade } from '@/components/shared/MotionFade';

const FullTheme = () => {
  return (
    <MotionFade css={containerStyle}>
      <div css={fullStyle}>
        <p css={fullTextStyle('12%')}>2026년 6월 14일</p>
        <p css={fullTextStyle('15%')}>오후 1시 20분</p>
        <p css={fullTextStyle('22%')}>더 컨벤션 영등포</p>
        <img alt="main" css={imageStyle} src={mainImage} />
        <p css={fullTitleStyle}>Our Wedding Day</p>
      </div>
    </MotionFade>
  );
};

const containerStyle = css`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const fullStyle = css`
  width: 100%;
  height: 100%;
  position: relative;
`;

const fullTextStyle = (top: string) => css`
  position: absolute;
  top: ${top};
  left: 50%;
  transform: translateX(-50%);
  color: var(--gray2);
  font-size: 0.8rem;
  z-index: 2;
`;

const imageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`;

const typing = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const blink = keyframes`
  50% { border-color: transparent }
`;

const fullTitleStyle = css`
  position: absolute;
  bottom: 30%;
  left: 50%;
  transform: translateX(-50%);
  color: var(--gray2);
  font-size: 2rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  border-right: 2px solid white;
  width: 0;
  animation:
    ${typing} 2.5s steps(20, end) forwards,
    ${blink} 0.8s step-end infinite;
  z-index: 2;
`;

export default FullTheme;
