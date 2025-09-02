import { css } from '@emotion/react';

type BaseImageInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange'
> & {
  onChange: (files: File[]) => void; // 이벤트 대신 파일 배열
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
    event.currentTarget.value = ''; // 같은 파일 재선택 허용
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

const fileInputStyle = css`
  color: transparent;
  text-shadow: none;
  width: 100px;

  &::file-selector-button {
    padding: 8px 16px;
    border-radius: 6px;
    background-color: var(--blue9);
    border: none;
    color: white;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  &::file-selector-button:hover {
    background-color: var(--blue11);
  }

  &::-webkit-file-upload-button {
    padding: 8px 16px;
    border-radius: 6px;
    background-color: var(--blue9);
    color: white;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  &::-webkit-file-upload-button:hover {
    background-color: var(--blue11);
  }
`;

export default BaseImageInput;
