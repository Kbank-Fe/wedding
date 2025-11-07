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

BaseDateInput.displayName = 'BaseDateInput';

const baseDateInputStyle = css`
  color: var(--gray11) !important;
  -webkit-text-fill-color: var(--gray11) !important;
  flex: 1;
  height: 39px;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--gray4);
  border-radius: 6px;
  font-size: 13px;
  background-color: transparent;
  appearance: none;
  box-shadow: none;
  transition:
    border-color 0.25s ease,
    background-color 0.25s ease;

  &::-webkit-calendar-picker-indicator {
    display: none;
  }

  &:hover {
    border-color: var(--gray8);
  }

  &:focus {
    outline: none;
    border-color: var(--gray11);
  }
`;

export default BaseDateInput;
