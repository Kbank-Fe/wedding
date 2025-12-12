import BaseTextInput from '@/components/shared/BaseTextInput';
import Field from '@/components/shared/Field';
import { useWeddingStore } from '@/stores/useWeddingStore';
import type { ThemeList } from '@/utils/themeList';

type Props = {
  localThemeItem?: ThemeList;
};

// type을 제외한 키만 허용하도록 설정
type AllowedKeys = keyof Omit<ThemeList, 'type'>;

const ThemeFields = ({ localThemeItem }: Props) => {
  const setDeep = useWeddingStore((state) => state.setDeep);
  const theme = useWeddingStore((state) => state.values.theme) || {};

  if (!localThemeItem) return null;

  return (
    <>
      {Object.entries(localThemeItem)
        .filter(([key]) => key !== 'type') // type 제외
        .map(([key, value]) => {
          const typedKey = key as AllowedKeys;

          // 타입 예외 처리
          if (!value || typeof value !== 'object') return null;

          const option = value; // TextInputOption

          if (!option.isShow) return null;

          return (
            <Field
              key={key}
              description={option.label}
              label={option.label}
              mode="single"
            >
              <BaseTextInput
                maxLength={option.maxLength}
                placeholder={`${option.label} 입력해주세요`}
                value={theme.text[typedKey] || ''}
                onChange={(e) => {
                  setDeep((draft) => {
                    draft.theme.text[typedKey] = e.target.value;
                  });
                }}
              />
            </Field>
          );
        })}
    </>
  );
};

export default ThemeFields;
