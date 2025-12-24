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
      {(Object.keys(localThemeItem) as TextAllowedKeys[]).map((key) => {
        const option = localThemeItem[key];

        if (!option) return null;
        if (option.type !== 'text') return null;

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
              value={theme[key] || ''}
              onChange={(e) => {
                setField('theme', key, e.target.value);
              }}
            />
          </Field>
        );
      })}
    </>
  );
};

export default ThemeTextFields;
