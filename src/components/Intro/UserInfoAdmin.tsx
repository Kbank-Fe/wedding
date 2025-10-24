import { type ChangeEvent } from 'react';

import BaseCheckBoxInput from '@/components/shared/BaseCheckBoxInput';
import BaseTextInput from '@/components/shared/BaseTextInput';
import Field from '@/components/shared/Field';
import { useWeddingStore } from '@/stores/useWeddingStore';
import type {
  UserBasicInfoBoolean,
  UserBasicInfoString,
} from '@/types/wedding';

type UserInfo = {
  label: string;
  key: keyof UserBasicInfoString;
  deceasedKey?: keyof UserBasicInfoBoolean;
};

const USER_LIST: UserInfo[] = [
  { label: '신랑', key: 'maleName' },
  {
    label: '신랑 아버지',
    key: 'maleFatherName',
    deceasedKey: 'maleFatherDeceased',
  },
  {
    label: '신랑 어머니',
    key: 'maleMotherName',
    deceasedKey: 'maleMotherDeceased',
  },
  { label: '신부', key: 'femaleName' },
  {
    label: '신부 아버지',
    key: 'femaleFatherName',
    deceasedKey: 'femaleFatherDeceased',
  },
  {
    label: '신부 어머니',
    key: 'femaleMotherName',
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
      {USER_LIST.map(({ label, key, deceasedKey }) => (
        <Field key={key as string} label={label}>
          <BaseTextInput
            placeholder="이름을 입력해주세요"
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
              id={label}
              onChange={handleChangeCheckbox(deceasedKey)}
            />
          )}
        </Field>
      ))}
    </>
  );
};

export default UserInfoAdmin;
