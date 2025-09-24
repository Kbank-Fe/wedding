import { css } from '@emotion/react';

type BaseCheckBoxInputProps = {
  checkboxLabel?: string;
  checked: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const BaseCheckBoxInput = ({
  checkboxLabel,
  checked,
  ...rest
}: BaseCheckBoxInputProps) => {
  return (
    <div css={wapperStyle}>
      <input checked={checked} css={checkboxStyle} type="checkbox" {...rest} />
      {checkboxLabel && <span>{checkboxLabel}</span>}
    </div>
  );
};

const checkboxStyle = css`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: var(--gray5);
  position: relative;
  /* cursor: pointer; */
  transition: background-color 0.2s ease;

  &:checked {
    background-color: var(--gray12);
  }

  &:checked::after {
    content: '✔';
    font-size: 14px;
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const wapperStyle = css`
  display: flex;
  align-items: center;
  gap: 8px; /* 체크박스와 텍스트 사이 간격 */
  cursor: pointer;
`;
export default BaseCheckBoxInput;
