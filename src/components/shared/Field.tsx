// Field.tsx — 단일/복수 컨트롤을 자동 처리하는 하나의 컴포넌트
import { css } from '@emotion/react';
import React, { Children, isValidElement, useId } from 'react';

import { useViewportStore } from '@/stores/useViewportStore';

type FieldProps = {
  label: string; // 화면에 보이는 라벨(단일: <label>, 복수: legend 또는 시각 라벨)
  description?: string; // 보조 설명. 제공 시 aria-describedby 연결
  children: React.ReactNode; // 1개 또는 여러 개의 컨트롤
  mode?: 'auto' | 'single' | 'group';
  useVisualLabelInGroup?: boolean; // 복수 모드일 때 legend를 숨기고, 대신 가시 라벨(span)을 써서 가로배치에 참여시킬지
  labelWidth?: number; // 라벨 고정 폭(px)
};

const Field = ({
  label,
  description,
  children,
  mode = 'auto',
  useVisualLabelInGroup = true,
  labelWidth = 100,
}: FieldProps) => {
  const isMobile = useViewportStore((state) => state.isMobile);

  const rootId = useId();
  const labelId = `${rootId}-label`;
  const visualLabelId = `${rootId}-vlabel`;
  const descId = description ? `${rootId}-desc` : undefined;

  const count = Children.count(children);
  const isGroup = mode === 'group' || (mode === 'auto' && count > 1);

  if (isGroup) {
    return (
      <fieldset aria-describedby={descId} css={fieldsetStyle}>
        <legend css={srOnlyStyle} id={labelId}>
          {label}
        </legend>

        <div css={rowStyle}>
          {useVisualLabelInGroup && (
            <span css={labelStyle(labelWidth, isMobile)} id={visualLabelId}>
              {label}
            </span>
          )}

          <div css={controlsStyle}>
            {Children.map(children, (child, i) =>
              isValidElement<React.HTMLAttributes<HTMLElement>>(child)
                ? React.cloneElement(child, {
                    id: child.props?.id ?? `${rootId}-ctrl-${i}`,
                    'aria-labelledby': useVisualLabelInGroup
                      ? visualLabelId
                      : labelId,
                    ...(descId ? { 'aria-describedby': descId } : {}),
                  })
                : child,
            )}
          </div>
        </div>
      </fieldset>
    );
  }

  const only = Children.only(children) as React.ReactElement<
    React.HTMLAttributes<HTMLElement>
  >;
  const controlId = only.props?.id ?? `${rootId}-ctrl-0`;

  return (
    <div css={singleRowStyle(isMobile)}>
      <label
        css={labelStyle(labelWidth, isMobile)}
        htmlFor={controlId}
        id={labelId}
      >
        {label}
      </label>
      <div css={controlWrapperStyle(isMobile)}>
        {React.cloneElement(only, {
          id: controlId,
          ...(descId ? { 'aria-describedby': descId } : {}),
        })}
      </div>
    </div>
  );
};

const singleRowStyle = (isMobile: boolean) => css`
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 0.5rem 0;
  flex-direction: ${isMobile ? 'column' : 'row'};
  align-items: ${isMobile ? 'flex-start' : 'center'};
`;

const labelStyle = (width: number, isMobile: boolean) => css`
  width: ${isMobile ? 'auto' : `${width}px`};
  margin: 0.5rem 0;
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
`;

const controlWrapperStyle = (isMobile: boolean) => css`
  flex: 1;
  min-width: ${isMobile ? '100%' : '200px'};
`;

const fieldsetStyle = css`
  border: 0;
  padding: 0;
  margin: 0.5rem 0;
`;

const rowStyle = css`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const controlsStyle = css`
  display: flex;
  gap: 8px;
  align-items: center;
  flex: 1;
  min-width: 200px;
  flex-wrap: wrap;
`;

const srOnlyStyle = css`
  position: absolute !important;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export default Field;
