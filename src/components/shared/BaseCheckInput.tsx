import { css } from '@emotion/react';

type CheckboxRowProps = {
  checkboxLabel: string;
  checked: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputCheck = ({ checkboxLabel, checked, ...rest }: CheckboxRowProps) => {
  return (
    <div>
      <label css={labelStyle}>
        <input
          checked={checked}
          css={checkboxStyle}
          type="checkbox"
          {...rest}
        />
        <span>{checkboxLabel}</span>
      </label>
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
  background-color: #ccc; /* 기본 회색 */
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:checked {
    background-color: #000; /* 검정 배경 */
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

const labelStyle = css`
  display: flex;
  align-items: center;
  gap: 8px; /* 체크박스와 텍스트 사이 간격 */
  cursor: pointer;
`;
export default InputCheck;
