import { css } from '@emotion/react';
import type { ReactNode } from 'react';

type PageLayoutProps = {
  children: ReactNode;
};

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div css={layoutStyle}>
      <div css={wrapperStyle}>{children}</div>
    </div>
  );
};

const layoutStyle = css`
  width: 100%;
  max-width: 500px;
  height: 100vh;
  margin: 0 auto;
  background: var(--gray1);
`;

const wrapperStyle = css`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
`;

export default PageLayout;
