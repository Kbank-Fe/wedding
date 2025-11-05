import { css } from '@emotion/react';
import type { ReactNode } from 'react';

type SectionProps = {
  children: ReactNode;
  isPadded?: boolean;
};

const Section = ({ children, isPadded = true }: SectionProps) => {
  return <div css={childWrapperStyle(isPadded)}>{children}</div>;
};

const childWrapperStyle = (isPadded: boolean) => css`
  width: 100%;
  margin: 0;
  padding: ${isPadded ? '2.5rem' : '0'};
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default Section;
