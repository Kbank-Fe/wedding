import { css } from '@emotion/react';
import React, { Children, isValidElement, useId } from 'react';

type FieldProps = {
  label: string;
  description?: string; // 제공 시 aria-describedby 연결
  children: React.ReactNode;
  mode?: 'auto' | 'single' | 'group';
  useVisualLabelInGroup?: boolean; // 복수 모드일 때 legend를 숨기고, 대신 가시 라벨(span)을 써서 가로배치에 참여시킬지
};

const Field = ({
  label,
  description,
  children,
  mode = 'auto',
  useVisualLabelInGroup = true,
}: FieldProps) => {
  const rootId = useId();
  const labelId = `${rootId}-label`;
  const visualLabelId = `${rootId}-vlabel`;
  const descId = description ? `${rootId}-desc` : undefined;

  const validChildren = React.Children.toArray(children).filter(Boolean);
  const count = validChildren.length;
  const isGroup = mode === 'group' || (mode === 'auto' && count > 1);

  console.log(count, mode, isGroup);

  if (isGroup) {
    return (
      <fieldset aria-describedby={descId} css={fieldsetStyle}>
        <legend css={srOnlyStyle} id={labelId}>
          {label}
        </legend>
        <div css={rowStyle}>
          {useVisualLabelInGroup && (
            <span css={labelStyle} id={visualLabelId}>
              {label}
            </span>
          )}
          <div css={groupControlStyle}>
            {Children.map(validChildren, (child, i) =>
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

  if (count === 1) {
    const only = validChildren[0] as React.ReactElement<
      React.HTMLAttributes<HTMLElement>
    >;
    const controlId = only.props?.id ?? `${rootId}-ctrl-0`;

    return (
      <div css={singleRowStyle}>
        <label css={labelStyle} htmlFor={controlId} id={labelId}>
          {label}
        </label>
        <div css={controlsStyle}>
          {React.cloneElement(only, {
            id: controlId,
            ...(descId ? { 'aria-describedby': descId } : {}),
          })}
        </div>
      </div>
    );
  }
  return null;
};

const singleRowStyle = css`
  display: flex;
  gap: 8px;
  margin: 0.5rem 0;
  justify-content: center;
  align-items: center;
  color: var(--gray11);
`;

const labelStyle = css`
  margin: 0.5rem 0;
  width: 80px;
  font-size: 13px;
  display: flex;
  align-items: flex-start;
`;

const fieldsetStyle = css`
  border: 0;
  padding: 0;
  margin: 0.5rem 0;
  color: var(--gray11);
`;

const rowStyle = css`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const controlsStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  flex-wrap: wrap;
`;

const groupControlStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
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
