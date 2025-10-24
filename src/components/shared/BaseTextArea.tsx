import { css } from '@emotion/react';
import type { TextareaHTMLAttributes } from 'react';

type BaseTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  rows?: number;
  placeholder?: string;
};

const BaseTextArea = ({ rows = 4, ...rest }: BaseTextAreaProps) => {
  return <textarea css={textAreaStyle} rows={rows} {...rest} />;
};

const textAreaStyle = css`
  width: 100%;
  border: 1px solid var(--gray4);
  border-radius: 6px;
  padding: 0.6rem 0.8rem;
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

export default BaseTextArea;
