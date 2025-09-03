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
`;

export default BaseTextArea;
