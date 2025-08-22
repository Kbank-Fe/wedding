import { css } from '@emotion/react';
import { type ComponentProps, useId } from 'react';

type TextInputProps = Omit<ComponentProps<'input'>, 'type'> & {
  text: string;
  handleChangeInput: () => void;
  label: string;
  placeholder?: string;
  maxLength?: number;
};

const TextInput = ({
  text,
  handleChangeInput,
  label,
  placeholder,
  maxLength,
  ref,
  ...rest
}: TextInputProps) => {
  const generatedId = useId();

  return (
    <div css={wrapperStyle}>
      <label css={labelStyle} htmlFor={generatedId}>
        {label}
      </label>
      <input
        ref={ref}
        css={inputStyle}
        id={generatedId}
        maxLength={maxLength}
        placeholder={placeholder}
        type="text"
        value={text}
        onChange={handleChangeInput}
        {...rest}
      />
    </div>
  );
};

const wrapperStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const labelStyle = css`
  min-width: 60px;
  font-size: 14px;
  font-weight: 500;
  color: var(--grey7);
`;

const inputStyle = css`
  flex: 1;
  height: 40px;
  padding: 0 12px;
  border-radius: 6px;
  font-size: 15px;
  background-color: var(--gray3);

  &::placeholder {
    color: var(--gray8);
    font-weight: 300;
  }
`;

export default TextInput;
