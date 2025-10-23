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
    <label css={css([wrapperStyle, wrapperInteractiveStyle])} htmlFor={id}>
      <input
        checked={checked}
        css={checkboxStyle}
        id={id}
        type="checkbox"
        {...rest}
      />
      <span className="custom-checkbox">
        {checked && <FaCheck css={iconStyle} />}
      </span>
      {checkboxLabel && <span css={labelStyle}>{checkboxLabel}</span>}
    </label>
  );
};

const wrapperStyle = css`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  user-select: none;
`;

const checkboxStyle = css`
  display: none;
`;

const iconStyle = css`
  font-size: 8px;
  line-height: 1.2;
  color: var(--gray11);
  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
`;

const labelStyle = css`
  font-size: 12px;
  color: var(--gray12);
`;

const wrapperInteractiveStyle = css`
  .custom-checkbox {
    width: 16px;
    height: 16px;
    border-radius: 4px;
    border: 1px solid var(--gray4);
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.25s ease;
  }

  &:hover .custom-checkbox {
    border-color: var(--gray8);
  }

  input:checked + .custom-checkbox {
    border-color: var(--gray11);
  }
`;

export default BaseCheckBoxInput;
