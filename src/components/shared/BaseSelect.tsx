import { css } from '@emotion/react';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { LuChevronDown } from 'react-icons/lu';

type BaseSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: { title: string; value: string | number }[];
  value: string | number;
};

const BaseSelect = forwardRef<HTMLSelectElement, BaseSelectProps>(
  ({ options, value, ...rest }, ref) => {
    const selectRef = useRef<HTMLSelectElement>(null);
    useImperativeHandle(ref, () => selectRef.current!, []);

    return (
      <div css={wrapperStyle}>
        <select ref={selectRef} css={baseSelectStyle} value={value} {...rest}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.title}
            </option>
          ))}
        </select>
        <LuChevronDown css={iconStyle} />
      </div>
    );
  },
);

BaseSelect.displayName = 'BaseSelect';

const wrapperStyle = css`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
`;

const baseSelectStyle = css`
  flex: 1;
  height: 39px;
  padding: 0.6rem 2rem 0.6rem 0.8rem;
  border: 1px solid var(--gray4);
  border-radius: 6px;
  font-size: 13px;
  background-color: transparent;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  transition:
    border-color 0.25s ease,
    background-color 0.25s ease;

  &:hover {
    border-color: var(--gray8);
  }

  &:focus {
    outline: none;
    border-color: var(--gray11);
  }

  &:hover + svg {
    color: var(--gray8);
  }

  &:focus + svg,
  &:active + svg {
    color: var(--gray11);
  }
`;

const iconStyle = css`
  position: absolute;
  right: 0.75rem;
  pointer-events: none;
  color: var(--gray7);
  font-size: 1rem;
  transition: color 0.25s ease;
`;

export default BaseSelect;
