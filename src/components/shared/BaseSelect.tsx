import { css } from '@emotion/react';

// rest props로 select 속성 전달 가능 (예: onChange, disabled 등)
type BaseSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: { title: string; value: string | number }[];
  value: string | number;
};

const BaseSelect = ({ options, value, ...rest }: BaseSelectProps) => {
  return (
    <div css={wrapperStyle}>
      <select css={baseSelectStyle} value={value} {...rest}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
      <span css={iconStyle}>▼</span>
    </div>
  );
};

const wrapperStyle = css`
  position: relative;
  display: inline-block;
  padding-right: 2;
  width: 100%;
  margin: 0.5rem 0;
`;

const baseSelectStyle = css`
  width: 100%;
  height: 2.5rem;
  padding: 0 1rem;
  font-size: 1rem;
  border: 1px solid var(--gray4);
  border-radius: 8px;
  background-color: var(--gray5);
  /* 브라우저 기본 화살표 제거*/
  appearance: none;
`;

const iconStyle = css`
  position: absolute;
  right: 0.75rem;
  padding-right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

export default BaseSelect;
