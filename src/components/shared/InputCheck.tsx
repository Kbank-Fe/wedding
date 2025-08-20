import { css } from '@emotion/react';
import { useId } from 'react';

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

type CheckboxRowProps = {
  checkboxLabel: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const InputCheck = ({ checkboxLabel, checked, onChange }: CheckboxRowProps) => {
  const id = useId();

  return (
    <div>
      <label css={labelStyle} htmlFor={id}>
        <input
          checked={checked}
          css={checkboxStyle}
          id={id}
          type="checkbox"
          onChange={(e) => onChange(e.target.checked)}
        />
        <span>{checkboxLabel}</span>
      </label>
    </div>
  );
};

export default InputCheck;
/*
  [부모컴포넌트 예시]

  import { useState } from 'react';
  
  import InputCheck from './InputCheck';
  
  const InputCheckTest = () => {
    const [checked, setChecked] = useState(false);
  
    return (
      <div>
        <InputCheck
          checkboxLabel="이메일 알림 받기"
          checked={checked}
          onChange={setChecked}
        />
        <br />
        <p>현재 체크 상태 : {checked ? '체크됨' : '체크 안 됨'}</p>
        <br />
      </div>
    );
  };
  
  export default InputCheckTest;
  

*/
