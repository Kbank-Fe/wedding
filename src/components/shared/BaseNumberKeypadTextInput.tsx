import { css } from '@emotion/react';
import { useState } from 'react';

type BaseNumberKeypadTextInputProps = {
  onEmit: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const BaseNumberKeypadTextInput = ({
  onEmit,
  placeholder,
  className,
}: BaseNumberKeypadTextInputProps) => {
  const [displayValue, setDisplayValue] = useState('');

  function formatPhone(value: string) {
    const numbers = value.replace(/\D/g, ''); // 숫자만 추출

    // 010-1234-5678 형태 포맷
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7)
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    setDisplayValue(formatPhone(rawValue)); // dash 포함 표시
  };

  const handleBlur = () => {
    const rawValue = displayValue.replace(/\D/g, '');
    onEmit(rawValue); // 부모에 dash 없는 값 전달
  };

  return (
    <input
      autoComplete="off" // 브라우저 자동 완성 기능 off
      autoCorrect="off" // 브라우저 (특히 IOS) 자동 교정 기능 off
      className={className} // 기본 클래스와 추가 클래스 결합
      css={baseNumberKeypadTextInputStyle}
      inputMode="numeric" // 숫자 키패드 모드 활성화
      pattern="[0-9]*" // 숫자 입력 패턴
      placeholder={placeholder}
      spellCheck="false" // 브라우저 스펠링 검사 기능 off
      type="text"
      value={displayValue}
      onBlur={handleBlur}
      onChange={(e) => handleChange(e)}
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
