import { css } from '@emotion/react';

type LineProps = {
  marginTop?: number;
  marginBottom?: number;
};

const Line = ({ marginTop = 25, marginBottom = 25 }: LineProps) => {
  return <hr css={lineStyle(marginTop, marginBottom)} />;
};

const lineStyle = (mt: number, mb: number) => css`
  width: 70%;
  margin: ${mt}px auto ${mb}px auto;
  border: none;
  border-bottom: 1px solid var(--gray10);
`;

export default Line;
