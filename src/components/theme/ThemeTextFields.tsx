import { useCallback } from 'react';

import BaseEnglishTextInput from '@/components/shared/BaseEnglishTextInput';
import Field from '@/components/shared/Field';
import { useWeddingStore } from '@/stores/useWeddingStore';
import type { TextAllowedKeys, ThemeList } from '@/utils/themeList';

type Props = {
  localThemeItem?: ThemeList;
};

const ThemeTextFields = ({ localThemeItem }: Props) => {
  const setField = useWeddingStore((state) => state.setField);
  const theme = useWeddingStore((state) => state.values.theme) || {};

  const handleChangeField = useCallback(
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

        return (
          <Field
            key={key}
            description={option.label}
            label={option.label}
            mode="single"
          >
            <BaseEnglishTextInput
              maxLength={option.maxLength}
              placeholder={`${option.label} 입력해주세요`}
              value={theme[key] || ''}
              onChange={handleChangeField(key)}
            />
          </Field>
        );
      })}
    </>
  );
};

export default ThemeTextFields;
