import { css } from '@emotion/react';
import React, { type ReactElement, useId } from 'react';

import { useViewportStore } from '@/stores/useViewportStore';

type InputProps = {
  labelText?: string;
  ariaLabel?: string;
  children: ReactElement; // input, select, textarea 등 하나의 ReactElement
};

const Input = ({ labelText, ariaLabel, children }: InputProps) => {
  const isMobile = useViewportStore((state) => state.isMobile);

  const generatedId = useId();
  const inputProps = !labelText ? { 'aria-label': ariaLabel } : {};

  return (
    <div css={wrapperStyle(isMobile)}>
      {labelText && (
        <label css={labelStyle(isMobile)} htmlFor={generatedId}>
          {labelText}
        </label>
      )}
      <div css={childrenStyle}>
        {React.cloneElement(
          children as ReactElement<React.HTMLAttributes<HTMLElement>>,
          { id: generatedId, ...inputProps },
        )}
      </div>
    </div>
  );
};

const wrapperStyle = (isMobile: boolean) => css`
  display: flex;
  gap: 5px;
  margin: 0.5rem 0;

  flex-direction: ${isMobile ? 'column' : 'row'};
  align-items: ${isMobile ? 'flex-start' : 'center'};
`;

const labelStyle = (isMobile: boolean) => css`
  width: ${isMobile ? '100%' : '100px'};
  flex-shrink: 0;
`;

const childrenStyle = css`
  flex: 1;
  width: 100%; // 모바일에서 가로 전부 차지
`;

export default Input;
