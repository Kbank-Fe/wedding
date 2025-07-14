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
  height: 100vh;
  background-color: var(--gray1);
  margin: 0;
  padding: 0;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 2rem;
`;

export default Section;
