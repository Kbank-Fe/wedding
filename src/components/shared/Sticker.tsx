import { css } from '@emotion/react';

type StickerProps = {
  top?: string;
  left?: string;
  size?: string;
  color?: string;
};

const Sticker = ({
  top = '0',
  left = '0',
  size = '46px',
  color = 'var(--gray5)',
}: StickerProps) => {
  return <div css={stickerStyle({ top, left, size, color })} />;
};

const stickerStyle = ({
  top,
  left,
  size,
  color,
}: {
  top: string;
  left: string;
  size: string;
  color: string;
}) => css`
  position: absolute;
  top: ${top};
  left: ${left};
  width: ${size};
  height: ${size};
  border-radius: 50%;
  background: ${color};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
`;

export default Sticker;
