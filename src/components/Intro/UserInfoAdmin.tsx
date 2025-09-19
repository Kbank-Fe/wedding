import { type ChangeEvent, useState } from 'react';

import BaseCheckBoxInput from '@/components/shared/BaseCheckBoxInput';
import BaseTextInput from '@/components/shared/BaseTextInput';
import Field from '@/components/shared/Field';
import { useWeddingStore } from '@/stores/useWeddingStore';
import type { UserBasicInfo } from '@/types/wedding';

export const USER_LIST: {
  label: string;
  key: keyof UserBasicInfo;
  placeholder: string;
  deceasedKey?: keyof UserBasicInfo;
}[] = [
  { label: '🤵🏻 신랑', key: 'maleName', placeholder: '성함(OOO)' },
  {
    label: '아버지',
    key: 'maleFatherName',
    placeholder: '아버지 성함(OOO)',
    deceasedKey: 'maleFatherDeceased',
  },
  {
    label: '어머니',
    key: 'maleMotherName',
    placeholder: '어머니 성함(OOO)',
    deceasedKey: 'maleMotherDeceased',
  },
  { label: '👰🏻 신부', key: 'femaleName', placeholder: '신부 성함(OOO)' },
  {
    label: '아버지',
    key: 'femaleFatherName',
    placeholder: '아버지 성함(OOO)',
    deceasedKey: 'femaleFatherDeceased',
  },
  {
    label: '어머니',
    key: 'femaleMotherName',
    placeholder: '어머니 성함(OOO)',
    deceasedKey: 'femaleMotherDeceased',
  },
];

const UserInfoAdmin = () => {
  const setDeep = useWeddingStore((state) => state.setDeep);
  const basicInfo = useWeddingStore((state) => state.values.intro.basicInfo[0]);

  const handleChangeInput =
    (key: keyof UserBasicInfo) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDeep((draft) => {
        draft.intro.basicInfo[0][key] = event.currentTarget.value;
        // 변경 직후 값 콘솔 출력
        console.log('input changed:', draft.intro.basicInfo[0]);
      });
    };

  // 체크박스 상태 변경 핸들러
  const handleChangeCheckbox =
    (key: keyof UserBasicInfo) => (e: ChangeEvent<HTMLInputElement>) => {
      setDeep((draft) => {
        draft.intro.basicInfo[0][key] = e.currentTarget.checked;
        // 변경 직후 값 콘솔 출력
        console.log('checkbox changed:', draft.intro.basicInfo[0]);
      });
    };

  return (
    <>
      {USER_LIST.map(({ label, key, placeholder, deceasedKey }) => (
        <Field key={key as string} label={label}>
          <BaseTextInput
            placeholder={placeholder}
            value={basicInfo?.[key] ?? ''}
            onChange={handleChangeInput(key)}
          />
          {deceasedKey && (
            <BaseCheckBoxInput
              checkboxLabel={'故'}
              checked={!!basicInfo?.[deceasedKey]}
              onChange={handleChangeCheckbox(deceasedKey)}
            />
          )}
        </Field>
      ))}
    </>
  );
};

export default UserInfoAdmin;
