import React from 'react';

import BaseTextInput from '@/components/shared/BaseTextInput';

type BaseEnglishTextInputProps = React.ComponentProps<typeof BaseTextInput>;

/**
 * 영문, 공백만 허용하는 텍스트 인풋 컴포넌트
 * - 비제어 방식 (defaultValue) 으로 브라우저 IME (한글 조합) 개입 최소화
 */
const BaseEnglishTextInput = ({
  onChange,
  value,
  ...rest
}: BaseEnglishTextInputProps) => {
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const inputValue = target.value;

    // 영문자와 공백을 제외한 모든 문자 제거
    const filteredValue = inputValue.replace(/[^a-zA-Z\s]/g, '');

    // 한글 입력 발생 여부 확인
    const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(inputValue);

    if (hasKorean) {
      // 한글 입력 시 영문 사라지는 현상 방지
      window.requestAnimationFrame(() => {
        // 브라우저의 렌더링 사이클이 끝난 직후에 원복 (Lock 방지)
        target.value = filteredValue;
      });

      // 한글 조합 중 부모 상태 (zustand) 변경 및 데이터 오염 방지
      return;
    }

    // 한글 외 특수문자 입력 시 DOM 정제
    if (inputValue !== filteredValue) {
      target.value = filteredValue;
    }

    // 필터링 값이 기존 값과 다를 때만 onChange 호출
    if (filteredValue !== value) {
      onChange?.(e as React.ChangeEvent<HTMLInputElement>);
    }
  };

  /**
   * 한글 입력 직후 IME (한글 조합) 세션을 즉시 종료시키는 핸들러
   * - input 한글 입력 시 두번 지워야 영문 1개 삭제되는 현상 방지
   * - onCompositionStart 이벤트 : 한글 등 조합형 문자 입력이 시작되는 즉시 발생
   * - ex) 'ㄱ' 입력 직후
   */
  const handleCompositionStart = (
    e: React.CompositionEvent<HTMLInputElement>,
  ) => {
    const target = e.currentTarget;

    // 임시로 읽기 전용 모드로 변경하여 IME (한글 조합) 세션 종료 유도
    target.readOnly = true;

    // onCompositionStart 이벤트 종료 직후 읽기 전용 모드 해제
    setTimeout(() => {
      // 입력 세션 강제 종료 시 입력 기본값 '영문 모드' 리셋
      target.readOnly = false;
    }, 0);
  };

  return (
    <BaseTextInput
      {...rest}
      autoCapitalize="none" // 첫 글자 자동 대문자 변환 방지
      autoComplete="off" // 브라우저 자동완성 팝업 차단
      autoCorrect="off" // 브라우저 영문 오타 교정 기능 차단
      defaultValue={value} // React의 제어권보다 브라우저의 입력 속도를 우선시 (비제어 방식)
      inputMode="email" // 모바일 환경 영문 키보드 유도
      spellCheck={false} // 빨간 줄(맞춤법 검사) 방지
      onChange={() => {}} // React 경고 방지용 더미 함수
      onCompositionStart={handleCompositionStart} // 한글 입력 시작 시점 감지
      onInput={handleInput} // 모든 입력 단계에서 필터링 실행
    />
  );
};

export default BaseEnglishTextInput;
