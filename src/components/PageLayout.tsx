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

export default PageLayout;

const layoutStyle = css`
  width: 100%;
  max-width: 500px;
  height: 100vh;
  margin: 0 auto;
  background: var(--gray1);
`;

const wrapperStyle = css`
  min-width: 300px;
  height: 100%;
  min-height: fit-content;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
