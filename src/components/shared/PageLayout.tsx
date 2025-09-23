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
  min-height: 100vh;
  max-width: 500px;
  margin: 0 auto;
  background: var(--gray1);
`;

const wrapperStyle = css`
  width: 100%;
  padding: 2rem 0;
`;

export default PageLayout;
