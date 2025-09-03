import { css } from '@emotion/react';
import type { TextareaHTMLAttributes } from 'react';

type BaseTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  rows?: number;
  placeholder?: string;
};

const BaseTextArea = ({
  rows = 5,
  placeholder = '내용을 입력하세요',
  ...rest
}: BaseTextAreaProps) => {
  return (
    <textarea
      css={textAreaStyle}
      placeholder={placeholder}
      rows={rows}
      {...rest}
    />
  );
};

const textAreaStyle = css`
  width: 100%;
`;

export default BaseTextArea;
