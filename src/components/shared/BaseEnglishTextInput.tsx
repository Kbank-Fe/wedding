import React, { forwardRef, useCallback } from 'react';

import BaseTextInput from '@/components/shared/BaseTextInput';

type BaseEnglishTextInputProps = React.ComponentProps<typeof BaseTextInput>;

/**
 * React Hook Form과 호환되는 영문 전용 인풋 컴포넌트
 */
const BaseEnglishTextInput = forwardRef<
  HTMLInputElement,
  BaseEnglishTextInputProps
>(({ onChange, value, ...rest }, ref) => {
  const handleInput = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const target = e.currentTarget;
      // 영문과 공백만 허용하는 정규식 적용
      const originalValue = target.value;
      const filteredValue = originalValue.replace(/[^a-zA-Z\s]/g, '');

      // 한글(IME 조합)이 포함되어 있는지 확인
      const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(originalValue);

      if (hasKorean) {
        // 한글이 들어오는 즉시 DOM 값을 정제된 값으로 덮어씌워 조합을 깨뜨림
        target.value = filteredValue;
      }

      // 한글 외 특수문자 입력 시 DOM 정제
      if (originalValue !== filteredValue) {
        target.value = filteredValue;
      }

      // 부모(RHF) 상태 업데이트
      // 이벤트 객체를 그대로 전달하여 RHF의 onChange가 정상 동작하게 함
      onChange?.(e as unknown as React.ChangeEvent<HTMLInputElement>);
    },
    [onChange],
  );

  const handleCompositionStart = (
    e: React.CompositionEvent<HTMLInputElement>,
  ) => {
    const target = e.currentTarget;
    // 한글 입력 시작 시점에 blur/focus 효과를 주어 IME 세션을 강제 종료
    target.blur();

    // 모웹 안드로이드 한글 변경 시 키패드 사라지는 문제 해결을 위해 포커스는 다음 이벤트 루프에서 재설정
    setTimeout(() => target.focus(), 0);
  };

  return (
    <BaseTextInput
      {...rest}
      ref={ref}
      autoCapitalize="none"
      autoComplete="off"
      inputMode="email" // 모바일 영문 키보드 우선 노출
      spellCheck={false}
      value={value} // RHF Controller로부터 전달받은 제어값
      onCompositionStart={handleCompositionStart}
      onInput={handleInput}
    />
  );
});

BaseEnglishTextInput.displayName = 'BaseEnglishTextInput';

export default BaseEnglishTextInput;
