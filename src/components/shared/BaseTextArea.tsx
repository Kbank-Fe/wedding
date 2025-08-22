import { useState } from 'react';

type BaseTextAreaProps = {
  rows?: number;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

const BaseTextArea = ({
  rows = 5,
  placeholder = '내용을 입력하세요',
  value,
  onChange,
}: BaseTextAreaProps) => {
  const [internalValue, setInternalValue] = useState('');

  const text = value !== undefined ? value : internalValue;

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(value);
    } else {
      setInternalValue(value);
    }
  };

  return (
    <textarea
      placeholder={placeholder}
      rows={rows}
      value={text}
      onChange={handleChange}
    />
  );
};

export default BaseTextArea;

/*

// 기본 사용
<BaseTextArea />

// placeholder & rows 커스터마이징
<BaseTextArea rows={10} placeholder="메모를 입력해주세요" />

// Controlled
const [text, setText] = useState("");
<BaseTextArea value={text} onChange={setText} />

*/
