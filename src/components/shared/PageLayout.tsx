import { css } from '@emotion/react';
import type { ReactNode } from 'react';

type PageType = 'basic' | 'main' | 'service';

type PageLayoutProps = {
  children: ReactNode;
  pageType?: PageType;
};

const PageLayout = ({ children, pageType = 'basic' }: PageLayoutProps) => {
  return (
    <div css={layoutStyle({ pageType })}>
      <div css={wrapperStyle({ pageType })}>{children}</div>
    </div>
  );
};

const layoutStyle = ({ pageType }: { pageType: PageType }) => css`
  width: 100%;
  min-height: 100vh;
  max-width: 430px;
  margin: 0 auto;
  background: ${pageType === 'main' || pageType === 'service'
    ? '#F8F6F1'
    : 'var(--gray1)'};
  font-family: ${pageType === 'main' || pageType === 'service'
    ? "'Wedding', sans-serif"
    : 'inherit'};
  overflow-x: hidden;
`;

const wrapperStyle = ({ pageType }: { pageType: PageType }) => css`
  width: 100%;
  padding: ${pageType === 'service'
    ? 0
    : pageType === 'main'
      ? '1rem 0 0'
      : '3rem 1.5rem'};
  display: flex;
  flex-direction: column;
  gap: ${pageType === 'service' ? 0 : '5rem'};
`;

export default PageLayout;
