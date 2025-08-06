import { css } from '@emotion/react';

type LineProps = {
  marginTop?: number;
  marginBottom?: number;
};

const Line = ({ marginTop = 20, marginBottom = 20 }: LineProps) => {
  return <hr css={lineStyle(marginTop, marginBottom)} />;
};

const lineStyle = (mt: number, mb: number) => css`
  border: none;
  border-bottom: 1px solid var(--gray8);
  margin: ${mt}px 0 ${mb}px 0;
  width: 100%;
`;

export default Line;
