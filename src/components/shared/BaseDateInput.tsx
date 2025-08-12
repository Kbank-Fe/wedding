import { css } from '@emotion/react';
import { useId, useRef } from 'react';

// type BaseDateInputProps = {
//   onChange: (date: string) => void;
// };

const BaseDateInput = ({ ...rest }) => {
  const id = useId();
  const dateRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    dateRef.current?.showPicker(); // input click 시 달력 팝업 열기
  };

  return (
    <input
      ref={dateRef}
      css={baseDateInputStyle}
      id={id}
      type="date"
      {...rest}
      onClick={handleClick}
    />
  );
};

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
