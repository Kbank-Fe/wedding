import React from 'react';

import BaseCheckBoxInput from '@/components/shared/BaseCheckBoxInput';
import BaseTextEditor from '@/components/shared/BaseTextEditor';
import BaseTextInput from '@/components/shared/BaseTextInput';
import Field from '@/components/shared/Field';
import { useWeddingStore } from '@/stores/useWeddingStore';
import type { Intro } from '@/types/wedding';

const WeddingGreetingAdmin = () => {
  const setDeep = useWeddingStore((state) => state.setDeep);
  const greetingInfo = useWeddingStore((state) => state.values.intro);

  const handleChangeInput =
    (key: keyof Pick<Intro, 'title' | 'content'>) => (value: string) => {
      setDeep((draft) => {
        draft.intro[key] = value;
      });
    };

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeep((draft) => {
      draft.intro.showNames = e.target.checked;
    });
  };

  return (
    <>
      <Field label="제목">
        <BaseTextInput
          maxLength={30}
          placeholder="최대 30자 (예: 인사말, 모시는 길, 초대합니다 등)"
          value={greetingInfo.title || ''}
          onChange={(e) => handleChangeInput('title')(e.target.value)}
        />
      </Field>
      <Field label="내용">
        <BaseTextEditor
          height={300}
          value={greetingInfo.content || ''}
          onChange={handleChangeInput('content')}
        />
      </Field>
      <Field label="성함표기">
        <BaseCheckBoxInput
          checkboxLabel={'인사말 하단에 신랑 신부 & 혼주 성함 표시'}
          checked={greetingInfo.showNames}
          id="showNames"
          onChange={handleCheckBox}
        />
      </Field>
    </>
  );
};

export default WeddingGreetingAdmin;
