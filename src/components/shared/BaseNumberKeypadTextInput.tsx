import { css } from '@emotion/react';
import { useState } from 'react';

import { formatPhone } from '@/utils/format';

type BaseNumberKeypadTextInputProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
    placeholder?: string;
  };

const BaseNumberKeypadTextInput = ({
  placeholder,
  ...rest
}: BaseNumberKeypadTextInputProps) => {
  const [displayValue, setDisplayValue] = useState('');

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    setDisplayValue(formatPhone(rawValue)); // dash 포함 표시
  };

  return (
    <input
      autoComplete="off" // 브라우저 자동 완성 기능 off
      autoCorrect="off" // 브라우저 (특히 IOS) 자동 교정 기능 off
      css={baseNumberKeypadTextInputStyle}
      inputMode="numeric" // 숫자 키패드 모드 활성화
      maxLength={13} // 010-1234-5678 형태로 최대 13자
      pattern="[0-9]*" // 숫자 입력 패턴
      placeholder={placeholder}
      spellCheck="false" // 브라우저 스펠링 검사 기능 off
      type="text"
      value={displayValue}
      onChange={handleChangeText}
      {...rest}
    />
  );
};

const baseNumberKeypadTextInputStyle = css`
  width: 100%;
  height: 2.5rem;
  padding: 0 1rem;
  font-size: 1rem;
  border: 1px solid var(--gray4);
  border-radius: 8px;
  background-color: var(--gray5);
  margin: 0.5rem 0;
`;

export default BaseNumberKeypadTextInput;
