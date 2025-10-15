import { type ChangeEvent } from 'react';

import BaseCheckBoxInput from '@/components/shared/BaseCheckBoxInput';
import BaseTextInput from '@/components/shared/BaseTextInput';
import Field from '@/components/shared/Field';
import { useWeddingStore } from '@/stores/useWeddingStore';
import type {
  UserBasicInfoBoolean,
  UserBasicInfoString,
} from '@/types/wedding';

export const USER_LIST: {
  label: string;
  key: keyof UserBasicInfoString;
  placeholder: string;
  deceasedKey?: keyof UserBasicInfoBoolean;
}[] = [
  { label: '🤵🏻 신랑', key: 'maleName', placeholder: '성함(OOO)' },
  {
    label: '신랑 아버지',
    key: 'maleFatherName',
    placeholder: '신랑 아버지 성함(OOO)',
    deceasedKey: 'maleFatherDeceased',
  },
  {
    label: '신랑 어머니',
    key: 'maleMotherName',
    placeholder: '신랑 어머니 성함(OOO)',
    deceasedKey: 'maleMotherDeceased',
  },
  { label: '👰🏻 신부', key: 'femaleName', placeholder: '신부 성함(OOO)' },
  {
    label: '신부 아버지',
    key: 'femaleFatherName',
    placeholder: '신부 아버지 성함(OOO)',
    deceasedKey: 'femaleFatherDeceased',
  },
  {
    label: '신부 어머니',
    key: 'femaleMotherName',
    placeholder: '신부 어머니 성함(OOO)',
    deceasedKey: 'femaleMotherDeceased',
  },
];

const UserInfoAdmin = () => {
  const setDeep = useWeddingStore((state) => state.setDeep);
  const basicInfo = useWeddingStore((state) => state.values.intro.basicInfo);

  const handleChangeInput =
    (key: keyof UserBasicInfoString) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDeep((draft) => {
        draft.intro.basicInfo[key] = event.currentTarget.value;
      });
    };

  // 체크박스 상태 변경 핸들러
  const handleChangeCheckbox =
    (key: keyof UserBasicInfoBoolean) => (e: ChangeEvent<HTMLInputElement>) => {
      setDeep((draft) => {
        draft.intro.basicInfo[key] = e.currentTarget.checked;
      });
    };

  return (
    <>
      {USER_LIST.map(({ label, key, placeholder, deceasedKey }) => (
        <Field key={key as string} label={label}>
          <BaseTextInput
            placeholder={placeholder}
            value={
              typeof basicInfo?.[key] === 'string'
                ? (basicInfo[key] as string)
                : ''
            }
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
