import { css } from '@emotion/react';
import type { ReactNode } from 'react';

type SectionProps = {
  children: ReactNode;
};

const Section = ({ children }: SectionProps) => {
  return <div css={childWrapperStyle}>{children}</div>;
};

const childWrapperStyle = css`
  width: 100%;
  margin: 0;
  padding: 0 2.5rem;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default Section;
