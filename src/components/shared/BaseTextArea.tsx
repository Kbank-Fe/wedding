import { css } from '@emotion/react';

type BaseTextAreaProps = {
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

export default BaseTextArea;

const textAreaStyle = css`
  width: 100%;
`;
