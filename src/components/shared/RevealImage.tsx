import { css, keyframes, type SerializedStyles } from '@emotion/react';

type RevealImageProps = {
  src: string;
  alt?: string;
  css?: SerializedStyles;
};

const RevealImage = ({ src, alt = '', css }: RevealImageProps) => {
  return <img alt={alt} css={[revealImageStyle, css]} src={src} />;
};

const reveal = keyframes`
  from {
    opacity: 0;
    filter: blur(2px);
  }
  to {
    opacity: 1;
    filter: blur(0);
  }
`;

export const revealImageStyle = css`
  animation: ${reveal} 0.9s ease forwards;
`;

export default RevealImage;
