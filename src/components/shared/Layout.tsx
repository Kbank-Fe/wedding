import { css } from '@emotion/react';
import type { ReactNode } from 'react';

import { useViewportStore } from '@/stores/useViewportStore';

type ViewType = 'basic' | 'main' | 'service' | 'admin';

type LayoutProps = {
  children: ReactNode;
  viewType?: ViewType;
};

const Layout = ({ children, viewType = 'basic' }: LayoutProps) => {
  const isMobile = useViewportStore((state) => state.isMobile);

  return (
    <div css={layoutStyle({ viewType, isMobile })}>
      <div css={wrapperStyle({ viewType, isMobile })}>{children}</div>
    </div>
  );
};

const layoutStyle = ({
  viewType,
  isMobile,
}: {
  viewType: ViewType;
  isMobile: boolean;
}) => css`
  width: 100%;
  min-width: 320px;
  min-height: 100vh;
  max-width: ${!isMobile && viewType === 'admin' ? '' : '430px'};
  margin: 0 auto;
  background: ${viewType === 'basic' || viewType === 'admin'
    ? 'var(--gray1)'
    : '#F8F6F1'};
  font-family: ${viewType === 'basic' || viewType === 'admin'
    ? 'inherit'
    : "'Wedding', sans-serif"};
  overflow-x: hidden;
`;

const wrapperStyle = ({
  viewType,
  isMobile,
}: {
  viewType: ViewType;
  isMobile: boolean;
}) => css`
  width: 100%;
  padding: ${viewType === 'basic' || (isMobile && viewType === 'admin')
    ? '3rem 1.5rem'
    : 0};
  display: flex;
  flex-direction: column;
  gap: ${viewType === 'service' || viewType === 'admin' ? 0 : '5rem'};
`;

export default Layout;
