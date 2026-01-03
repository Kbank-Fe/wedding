import React, { useEffect, useRef } from 'react';

import BaseTextInput from '@/components/shared/BaseTextInput';

type BaseEnglishTextInputProps = React.ComponentProps<typeof BaseTextInput>;

const BaseEnglishTextInput = ({
  onChange,
  value,
  ...rest
}: BaseEnglishTextInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // 초기값에 한글이 포함된 경우 replace 처리
  useEffect(() => {
    if (inputRef.current) {
      // 외부에서 들어온 값(value) 한글 제거
      const cleanedValue = String(value || '').replace(/[^a-zA-Z\s]/g, '');

      // 원본 value에 한글이 있었다면 부모에게 다시 정제된 값 전달
      if (cleanedValue !== value) {
        onChange?.({
          target: { value: cleanedValue },
        } as React.ChangeEvent<HTMLInputElement>);
      }

      // 3. 인풋창에 깨끗한 영문만 표시
      if (inputRef.current.value !== cleanedValue) {
        inputRef.current.value = cleanedValue;
      }
    }
  }, [value, onChange]);

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const inputValue = target.value;
    const filteredValue = inputValue.replace(/[^a-zA-Z\s]/g, '');

    console.log(
      'typing inputValue:',
      inputValue,
      'filteredValue:',
      filteredValue,
    );

    const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(inputValue);

    if (hasKorean) {
      // 브라우저의 렌더링 사이클이 끝난 직후에 원복 (Lock 방지)
      window.requestAnimationFrame(() => {
        target.value = filteredValue;
      });

      return;
    }

    if (inputValue !== filteredValue) {
      target.value = filteredValue;
    }

    if (filteredValue !== value) {
      onChange?.(e as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <input
      {...rest}
      ref={inputRef}
      autoCapitalize="none" // 자동 대문자 변환 방지
      autoComplete="off"
      autoCorrect="off"
      defaultValue={value}
      inputMode="email" // 영문 키보드를 유도하는 팁
      spellCheck={false}
      onChange={() => {}}
      onInput={handleInput}
    />
  );
};

export default BaseEnglishTextInput;
