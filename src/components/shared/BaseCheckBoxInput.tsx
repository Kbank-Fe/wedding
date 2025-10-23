import { css } from '@emotion/react';
import { FaCheck } from 'react-icons/fa';

type BaseCheckBoxInputProps = {
  checkboxLabel?: string;
  checked: boolean;
  id: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const BaseCheckBoxInput = ({
  checkboxLabel,
  checked,
  id,
  ...rest
}: BaseCheckBoxInputProps) => {
  return (
    <label css={wrapperStyle} htmlFor={id}>
      <input
        checked={checked}
        css={checkboxStyle}
        id={id}
        type="checkbox"
        {...rest}
      />
      <div css={boxWrapperStyle}>{checked && <FaCheck css={iconStyle} />}</div>
      {checkboxLabel && <span css={labelStyle}>{checkboxLabel}</span>}
    </label>
  );
};

const wrapperStyle = css`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  user-select: none;
`;

const checkboxStyle = css`
  display: none;
`;

const boxWrapperStyle = css`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid var(--gray4);
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition:
    border-color 0.25s ease,
    background-color 0.25s ease;

  label:hover & {
    border-color: var(--gray8);
  }

  input:checked + & {
    border-color: var(--gray11);
  }
`;

const iconStyle = css`
  font-size: 8px;
  color: var(--gray11);
  display: block;
`;

const labelStyle = css`
  font-size: 12px;
  color: var(--gray12);
`;

export default BaseCheckBoxInput;
