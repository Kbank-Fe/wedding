// TextEditorTest.tsx
import React, { useState } from 'react';
import BaseTextEditor from './BaseTextEditor';

const TextEditorTest: React.FC = () => {
  const [content, setContent] = useState<string>('');

  return (
    <>
    <div style={{ maxWidth: 720, margin: '24px auto', padding: '0 16px' }}>

      <BaseTextEditor
        value={content}
        onChange={setContent}
        height={200}
        placeholder="내용을 입력하세요."
      />
   
    </div>
     <br></br><br></br><br></br>
    현재 입력 값 : {content}
    </>
  );
};

export default TextEditorTest;
