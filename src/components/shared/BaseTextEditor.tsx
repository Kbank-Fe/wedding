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
    <ReactQuill
      css={editorWrapperStyle(height ?? 100)}
      modules={modules}
      placeholder={placeholder}
      theme="snow"
      value={value}
      onChange={onChange}
    />
  );
};

const editorWrapperStyle = (height: number) => css`
  width: 100%;

  .ql-toolbar {
    height: fit-content;
    border-radius: 4px 4px 0 0;
  }

  .ql-toolbar.ql-snow .ql-formats {
    margin-right: 12px;
  }

  .ql-toolbar svg {
    width: 15px;
    height: 15px;
  }

  .ql-container {
    border-radius: 0 0 4px 4px;
  }

  .ql-editor {
    min-height: ${height}px;
    max-height: ${height}px;
    overflow-y: auto;
  }
`;

export default BaseTextEditor;
