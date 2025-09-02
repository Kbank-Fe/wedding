import { css } from '@emotion/react';
import { forwardRef, useImperativeHandle, useRef } from 'react';

type BaseDateInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const BaseDateInput = forwardRef<HTMLInputElement, BaseDateInputProps>(
  ({ ...rest }: BaseDateInputProps, ref) => {
    // 자식 내부 input DOM 직접 제어
    const dateRef = useRef<HTMLInputElement>(null);

    // 부모 ref를 자식의 input DOM에 연결
    useImperativeHandle(ref, () => dateRef.current!, []);

    // input click 시 달력 팝업 열기 클릭 이벤트 바인딩
    const handleClick = () => {
      dateRef.current?.showPicker();
    };

    // 현재 날짜(KST) 가져오기
    const todayKST = new Date(Date.now() + 9 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    return (
      <input
        ref={dateRef}
        css={baseDateInputStyle}
        type="date"
        {...rest}
        defaultValue={todayKST}
        onClick={handleClick}
      />
    );
  },
);

// forwardRef 적용 시 displayName 명시 필수
BaseDateInput.displayName = 'BaseDateInput';

const baseDateInputStyle = css`
  width: 100%;
  height: 2.5rem;
  padding: 0 1rem;
  margin: 0.5rem 0;
  font-size: 1rem;
  border: 1px solid var(--gray4);
  border-radius: 8px;
  background-color: var(--gray5);
  appearance: none; /* 브라우저 기본 스타일 제거 */
  box-shadow: none; /* 기본 박스 그림자 제거 */
  color: var(--gray12); /* 기본 텍스트 색상 설정 */
  &::-webkit-calendar-picker-indicator {
    display: none; /* 브라우저 기본 달력 아이콘 제거 */
  }
`;

export default BaseDateInput;
