import { useCallback } from 'react';

import BaseCheckBoxInput from '@/components/shared/BaseCheckBoxInput';
import Field from '@/components/shared/Field';
import { useWeddingStore } from '@/stores/useWeddingStore';
import type { CheckboxAllowedKeys, ThemeList } from '@/utils/themeList';

type Props = {
  localThemeItem?: ThemeList;
};

const ThemeCheckboxFields = ({ localThemeItem }: Props) => {
  const setField = useWeddingStore((state) => state.setField);
  const theme = useWeddingStore((state) => state.values.theme) || {};

  const handleChangeField = useCallback(
    (key: CheckboxAllowedKeys) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setField('theme', key, e.target.checked);
    },
    [setField],
  );

  if (!localThemeItem) return null;

  return (
    <>
      {(Object.keys(localThemeItem) as CheckboxAllowedKeys[]).map((key) => {
        const option = localThemeItem[key];

        if (!option) return null;
        if (option.type !== 'checkbox') return null;

        return (
          <Field
            key={key}
            description={option.label}
            label={option.label}
            mode="single"
          >
            <BaseCheckBoxInput
              checkboxLabel={option.checkboxLabel}
              checked={Boolean(theme[key])}
              id={`theme-checkbox-${key}`}
              onChange={handleChangeField(key)}
            />
          </Field>
        );
      })}
    </>
  );
};

export default ThemeCheckboxFields;
