import { css } from '@emotion/react';

type StickerProps = {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size?: string;
  color?: string;
};

const Sticker = ({
  top,
  left,
  right,
  bottom,
  size = '46px',
  color = 'var(--gray5)',
}: StickerProps) => {
  return <div css={stickerStyle({ top, left, right, bottom, size, color })} />;
};

const stickerStyle = ({
  top,
  left,
  right,
  bottom,
  size,
  color,
}: StickerProps) => css`
  position: absolute;
  ${top ? `top: ${top};` : ''}
  ${left ? `left: ${left};` : ''}
  ${right ? `right: ${right};` : ''}
  ${bottom ? `bottom: ${bottom};` : ''}

  width: ${size};
  height: ${size};
  border-radius: 50%;
  background: ${color};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
`;

export default Sticker;
