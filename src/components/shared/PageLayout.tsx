import { css } from '@emotion/react';
import type { ReactNode } from 'react';

type PageLayoutProps = {
  children: ReactNode;
  main?: boolean;
};

const PageLayout = ({ children, main = false }: PageLayoutProps) => {
  return (
    <div css={layoutStyle({ main })}>
      <div css={wrapperStyle}>{children}</div>
    </div>
  );
};

const layoutStyle = ({ main }: { main: boolean }) => css`
  width: 100%;
  min-height: 100vh;
  max-width: 500px;
  margin: 0 auto;
  background: var(--gray1);
  font-family: ${main ? "'Wedding', sans-serif" : "inherit"};
`;

const wrapperStyle = css`
  width: 100%;
  padding: 3rem 0;
`;

export default PageLayout;
