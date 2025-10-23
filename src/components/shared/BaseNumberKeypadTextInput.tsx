import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

import { formatPhone } from '@/utils/format';

type BaseNumberKeypadTextInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
> & {
  value: string; // 부모에서 내려오는 raw 값 (blur 이후 반영)
  onBlurValue: (value: string) => void; // blur 될 때 부모에게 raw 값 올려줌
  placeholder?: string;
};

const BaseNumberKeypadTextInput = ({
  value,
  onBlurValue,
  placeholder,
  ...rest
}: BaseNumberKeypadTextInputProps) => {
  const [displayValue, setDisplayValue] = useState(formatPhone(value ?? ''));

  // 부모 value가 바뀌면 동기화 (blur 이후 store 값 반영 시)
  useEffect(() => {
    setDisplayValue(formatPhone(value ?? ''));
  }, [value]);

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    setDisplayValue(formatPhone(rawValue)); // 로컬에서는 포맷된 값 유지
  };

  const handleBlur = () => {
    const rawValue = displayValue.replace(/\D/g, ''); // 숫자만 추출
    onBlurValue(rawValue); // blur 될 때만 부모에게 반영
  };

  return (
    <input
      autoComplete="off"
      autoCorrect="off"
      css={baseNumberKeypadTextInputStyle}
      inputMode="numeric"
      maxLength={13}
      pattern="[0-9]*"
      placeholder={placeholder}
      spellCheck="false"
      type="text"
      value={displayValue}
      onBlur={handleBlur}
      onChange={handleChangeText}
      {...rest}
    />
  );
};

const baseNumberKeypadTextInputStyle = css`
  flex: 1;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--gray4);
  border-radius: 6px;
  font-size: 13px;
  background-color: transparent;
  transition:
    border-color 0.25s ease,
    background-color 0.25s ease;

  &::placeholder {
    color: var(--gray8);
  }

  &:hover {
    border-color: var(--gray8);
  }

  &:focus {
    outline: none;
    border-color: var(--gray11);
  }
`;

export default BaseNumberKeypadTextInput;
