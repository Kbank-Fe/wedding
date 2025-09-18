import 'react-quill-new/dist/quill.snow.css';

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
    <div style={{ height }}>
      <ReactQuill
        modules={modules}
        placeholder={placeholder}
        style={{ height: '100%' }}
        theme="snow"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default BaseTextEditor;
