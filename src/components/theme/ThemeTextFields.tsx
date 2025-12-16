import BaseTextInput from '@/components/shared/BaseTextInput';
import Field from '@/components/shared/Field';
import { useWeddingStore } from '@/stores/useWeddingStore';
import type { TextAllowedKeys, ThemeList } from '@/utils/themeList';

type Props = {
  localThemeItem?: ThemeList;
};

const ThemeTextFields = ({ localThemeItem }: Props) => {
  const setField = useWeddingStore((state) => state.setField);
  const theme = useWeddingStore((state) => state.values.theme) || {};

  if (!localThemeItem) return null;

  return (
    <>
      {Object.entries(localThemeItem).map(([key, value]) => {
        const typedKey = key as TextAllowedKeys;

        // 타입 예외 처리
        if (!value || typeof value !== 'object' || value.type !== 'text') {
          return null;
        }

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
              value={theme[typedKey] || ''}
              onChange={(e) => {
                setField('theme', typedKey, e.target.value);
              }}
            />
          </Field>
        );
      })}
    </>
  );
};

export default ThemeTextFields;
