import { css } from '@emotion/react';

type BaseTextInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  ref?: React.Ref<HTMLInputElement>;
};

const BaseTextInput = ({ ref, ...rest }: BaseTextInputProps) => {
  return (
    <>
      <input ref={ref} css={inputStyle} type="text" {...rest} />
    </>
  );
};

const inputStyle = css`
  flex: 1;
  height: 39px;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--gray4);
  border-radius: 6px;
  font-size: 13px;
  background-color: transparent;
  transition:
    border-color 0.25s ease,
    background-color 0.25s ease;

  &::placeholder {
    color: var(--gray8);
  }

  &:hover {
    border-color: var(--gray8);
  }

  &:focus {
    outline: none;
    border-color: var(--gray11);
  }
`;

export default BaseTextInput;
