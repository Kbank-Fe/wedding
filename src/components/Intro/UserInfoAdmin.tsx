import BaseTextInput from '@/components/shared/BaseTextInput';
import Field from '@/components/shared/Field';
import { useWeddingStore } from '@/stores/useWeddingStore';
import type { UserBasicInfo } from '@/types/wedding';

export const USER_LIST: {
  label: string;
  key: keyof UserBasicInfo;
  placeholder: string;
}[] = [
  { label: '🤵🏻 신랑', key: 'maleName', placeholder: '성함(OOO)' },
  { label: '아버지', key: 'maleFatherName', placeholder: '아버지 성함(OOO)' },
  { label: '어머니', key: 'maleMotherName', placeholder: '어머니 성함(OOO)' },
  { label: '👰🏻 신부', key: 'femaleName', placeholder: '신부 성함(OOO)' },
  { label: '아버지', key: 'femaleFatherName', placeholder: '아버지 성함(OOO)' },
  { label: '어머니', key: 'femaleMotherName', placeholder: '어머니 성함(OOO)' },
];

const UserInfoAdmin = () => {
  const setDeep = useWeddingStore((state) => state.setDeep);
  const basicInfo = useWeddingStore((state) => state.values.intro.basicInfo[0]);

  const handleChangeInput =
    (key: keyof UserBasicInfo) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDeep((draft) => {
        draft.intro.basicInfo[0][key] = event.currentTarget.value;
      });
    };

  return (
    <>
      {USER_LIST.map(({ label, key, placeholder }) => (
        <Field key={key} label={label}>
          <BaseTextInput
            placeholder={placeholder}
            value={basicInfo?.[key] ?? ''}
            onChange={handleChangeInput(key)}
          />
        </Field>
      ))}
    </>
  );
};

export default UserInfoAdmin;
