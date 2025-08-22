import { css } from '@emotion/react';
import { type ComponentProps } from 'react';

type TextInputProps = Omit<ComponentProps<'input'>, 'type'> & {
  placeholder?: string;
  maxLength?: number;
};

const BaseTextInput = ({
  placeholder,
  maxLength,
  ref,
  ...rest
}: TextInputProps) => {
  return (
    <div css={wrapperStyle}>
      <input
        ref={ref}
        css={inputStyle}
        maxLength={maxLength}
        placeholder={placeholder}
        type="text"
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

export default BaseTextInput;
