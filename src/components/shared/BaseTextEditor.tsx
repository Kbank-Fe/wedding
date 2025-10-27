import 'react-quill-new/dist/quill.snow.css';

import { css } from '@emotion/react';
import ReactQuill from 'react-quill-new';

type BaseTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  height?: number;
};

const BaseTextEditor = ({
  value,
  onChange,
  placeholder,
  height,
}: BaseTextEditorProps) => {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['clean'],
    ],
  };

  return (
    <div css={editorWrapperStyle(height ?? 100)}>
      <ReactQuill
        modules={modules}
        placeholder={placeholder}
        theme="snow"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const editorWrapperStyle = (height: number) => css`
  width: 100%;

  .ql-toolbar {
    height: fit-content;
    border-radius: 6px 6px 0 0;
  }

  .ql-toolbar.ql-snow {
    border: 1px solid var(--gray4);
    padding: 0.4rem 0.6rem;
  }

  .ql-toolbar.ql-snow .ql-formats {
    margin-right: 0.2rem;
  }

  .ql-toolbar svg {
    width: 13px;
    height: 13px;
  }

  .ql-container {
    border-radius: 0 0 6px 6px;
    font-family: 'BasicSans';
  }

  .ql-container.ql-snow {
    color: var(--gray12);
    border: 1px solid var(--gray4);
  }

  .ql-editor {
    min-height: ${height}px;
    max-height: ${height}px;
    overflow-y: auto;
    padding: 0.6rem 0.8rem;
  }

  &:hover .ql-toolbar.ql-snow,
  &:hover .ql-container.ql-snow {
    border-color: var(--gray7);
  }
`;

export default BaseTextEditor;
