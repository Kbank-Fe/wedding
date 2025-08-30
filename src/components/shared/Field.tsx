// Field.tsx — 단일/복수 컨트롤을 자동 처리하는 하나의 컴포넌트
import { css } from '@emotion/react';
import React, { Children, isValidElement, useId } from 'react';

import { useViewportStore } from '@/stores/useViewportStore';

type FieldProps = {
  /** 화면에 보이는 라벨(단일: <label>, 복수: legend 또는 시각 라벨) */
  label: string;
  /** 보조 설명. 제공 시 aria-describedby 연결 */
  description?: string;
  /** 1개 또는 여러 개의 컨트롤 */
  children: React.ReactNode;
  /** 강제로 모드 지정: 기본 auto(자식 수로 판별) */
  mode?: 'auto' | 'single' | 'group';
  /** 복수 모드일 때 legend를 숨기고, 대신 가시 라벨(span)을 써서 가로배치에 참여시킬지 */
  useVisualLabelInGroup?: boolean;
  /** 라벨 고정 폭(px). 미지정 시 100px */
  labelWidth?: number;
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
    // ===== 복수 컨트롤 모드 =====
    // 접근성: fieldset/legend를 유지. (legend는 SR 전용으로 숨길 수도)
    return (
      <fieldset aria-describedby={descId} css={fsCss}>
        {/* 1) SR용 legend (항상 존재) */}
        <legend css={srOnly} id={labelId}>
          {label}
        </legend>

        <div css={rowCss}>
          {/* 2) 화면용 라벨: flex 배치에 참여시켜 "label - input - input" 구성 */}
          {useVisualLabelInGroup && (
            <span css={labelCss(labelWidth, isMobile)} id={visualLabelId}>
              {label}
            </span>
          )}

          <div css={controlsCss}>
            {Children.map(children, (child, i) =>
              isValidElement<React.HTMLAttributes<HTMLElement>>(child)
                ? React.cloneElement(child, {
                    id: child.props?.id ?? `${rootId}-ctrl-${i}`,
                    // 가시 라벨이 있으면 그것을, 아니면 legend를 참조
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

  // ===== 단일 컨트롤 모드 =====
  const only = Children.only(children) as React.ReactElement<
    React.HTMLAttributes<HTMLElement>
  >;
  const controlId = only.props?.id ?? `${rootId}-ctrl-0`;

  return (
    <div css={singleRowCss(isMobile)}>
      <label
        css={labelCss(labelWidth, isMobile)}
        htmlFor={controlId}
        id={labelId}
      >
        {label}
      </label>
      <div css={controlWrapCss(isMobile)}>
        {React.cloneElement(only, {
          id: controlId,
          ...(descId ? { 'aria-describedby': descId } : {}),
        })}
      </div>
    </div>
  );
};

/* ===== styles ===== */
const singleRowCss = (isMobile: boolean) => css`
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 0.5rem 0;
  flex-direction: ${isMobile ? 'column' : 'row'};
  align-items: ${isMobile ? 'flex-start' : 'center'};
`;

const labelCss = (width: number, isMobile: boolean) => css`
  width: ${isMobile ? 'auto' : `${width}px`};
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
`;

const controlWrapCss = (isMobile: boolean) => css`
  flex: 1;
  min-width: ${isMobile ? '100%' : '200px'};
`;

const fsCss = css`
  border: 0;
  padding: 0;
  margin: 0.5rem 0;
`;

const rowCss = css`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`;

const controlsCss = css`
  display: flex;
  gap: 8px;
  align-items: center;
  flex: 1;
  min-width: 200px;
  flex-wrap: wrap;
`;

const srOnly = css`
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
