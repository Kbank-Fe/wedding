import React from 'react';

import BaseTextInput from '@/components/shared/BaseTextInput';

type BaseEnglishTextInputProps = React.ComponentProps<typeof BaseTextInput>;

const BaseEnglishTextInput = ({
  onChange,
  value,
  ...rest
}: BaseEnglishTextInputProps) => {
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
    <BaseTextInput
      {...rest}
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
