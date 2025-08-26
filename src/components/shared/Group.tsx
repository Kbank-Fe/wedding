import { css } from '@emotion/react';
import { type ReactNode } from 'react';

import { useViewportStore } from '@/stores/useViewportStore';

type GroupProps = {
  labelText?: string;
  children: ReactNode; // div, input, select 등 여러 개 가능
};

const Group = ({ labelText, children }: GroupProps) => {
  const isMobile = useViewportStore((state) => state.isMobile);

  return (
    <fieldset css={wrapperStyle}>
      {/* {labelText && <label css={labelStyle(isMobile)}>{labelText}</label>} */}
      {labelText && <legend css={labelStyle(isMobile)}>{labelText}</legend>}
      <div css={childrenStyle}>{children}</div>
    </fieldset>
  );
};

const wrapperStyle = () => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  border: none; /* 기본 fieldset 테두리 제거 */
`;

const labelStyle = (isMobile: boolean) => css`
  display: ${isMobile ? 'block' : 'inline-flex'};
  align-items: center;
  width: ${isMobile ? '100%' : 'auto'};
  flex-shrink: 0;
  margin: 0; /* legend 기본 margin 제거 */
  padding: 0;
  white-space: nowrap; /* 줄바꿈 방지 */
`;

const childrenStyle = () => css`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  flex: 1;
  margin: 0.5rem 0;

  & > * {
    flex: 1;
    min-width: 120px;
  }
`;

export default Group;
