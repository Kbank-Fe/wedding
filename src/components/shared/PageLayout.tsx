import { css } from '@emotion/react';
import type { ReactNode } from 'react';

type PageType = 'basic' | 'main' | 'service';

type PageLayoutProps = {
  children: ReactNode;
  pageType?: PageType;
  isPadded?: boolean;
};

const PageLayout = ({
  children,
  pageType = 'basic',
  isPadded = true,
}: PageLayoutProps) => {
  return (
    <div css={layoutStyle({ pageType })}>
      <div css={wrapperStyle({ pageType, isPadded })}>{children}</div>
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

const wrapperStyle = ({
  pageType,
  isPadded,
}: {
  pageType: PageType;
  isPadded: boolean;
}) => css`
  width: 100%;
  padding: ${pageType === 'basic' ? '3rem 1.5rem' : 0};
  display: flex;
  flex-direction: column;
  gap: ${pageType === 'service' ? 0 : '5rem'};
`;

export default PageLayout;
