import { css } from '@emotion/react';
import type { ReactNode } from 'react';

type PageLayoutProps = {
  children: ReactNode;
};

const PageLayout = ({ children }: PageLayoutProps) => {
  return <div css={layoutStyle}>{children}</div>;
};

export default PageLayout;

const layoutStyle = () => css`
  width: 100%;
  max-width: 500px;
  height: 100vh;
  margin: 0 auto;
  background: var(--amber1);
`;
