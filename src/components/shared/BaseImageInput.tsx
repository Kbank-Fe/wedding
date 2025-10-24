import { css } from '@emotion/react';

type BaseImageInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange'
> & {
  onChange: (files: File[]) => void;
};

const BaseImageInput = ({
  accept = 'image/*',
  multiple = true,
  onChange,
  ...rest
}: BaseImageInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const list = event.currentTarget.files;
    if (!list) return;
    onChange(Array.from(list));
    // 같은 파일 재선택 허용
    event.currentTarget.value = '';
  };

  return (
    <input
      accept={accept}
      multiple={multiple}
      type="file"
      onChange={handleChange}
      {...rest}
      css={fileInputStyle}
    />
  );
};

const commonButtonStyle = css`
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  color: var(--gray11);
  background-color: var(--gray2);
  border: 1px solid var(--gray4);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition:
    border-color 0.25s ease,
    background-color 0.25s ease;

  &:hover {
    background-color: var(--gray8);
    color: var(--gray1);
    border-color: var(--gray8);
  }

  &:active {
    background-color: var(--gray11);
    color: var(--gray1);
    border-color: var(--gray11);
  }
`;

const fileInputStyle = css`
  color: transparent;
  text-shadow: none;
  width: 100px;

  &::file-selector-button {
    ${commonButtonStyle};
  }

  &::-webkit-file-upload-button {
    ${commonButtonStyle};
  }
`;

export default BaseImageInput;
