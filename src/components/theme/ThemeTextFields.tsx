import { useCallback } from 'react';

import BaseEnglishTextInput from '@/components/shared/BaseEnglishTextInput';
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

  const handleFieldChange = useCallback(
    (key: TextAllowedKeys) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setField('theme', key, e.target.value);
    },
    [setField],
  );

  if (!localThemeItem) return null;

  return (
    <>
      {(Object.keys(localThemeItem) as TextAllowedKeys[]).map((key) => {
        const option = localThemeItem[key];

        if (!option) return null;
        if (option.type !== 'text') return null;

        const InputComponent = option.englishOnly
          ? BaseEnglishTextInput
          : BaseTextInput;

        return (
          <Field
            key={key}
            description={option.label}
            label={option.label}
            mode="single"
          >
            <InputComponent
              maxLength={option.maxLength}
              placeholder={`${option.label} 입력해주세요`}
              value={theme[key] || ''}
              onChange={handleFieldChange(key)}
            />
          </Field>
        );
      })}
    </>
  );
};

export default ThemeTextFields;
