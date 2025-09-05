import { css } from '@emotion/react';

type BaseTextInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  ref?: React.Ref<HTMLInputElement>;
};

const BaseTextInput = ({ ref, ...rest }: BaseTextInputProps) => {
  return (
    <div css={wrapperStyle}>
      <input ref={ref} css={inputStyle} type="text" {...rest} />
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
