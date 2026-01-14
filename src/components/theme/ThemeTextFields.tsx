import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';

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

  // react-hook-form 초기화: Zustand의 현재 값을 기본값으로 설정
  const { control } = useForm<Record<TextAllowedKeys, string>>({
    values: theme as Record<TextAllowedKeys, string>, // Zustand 상태와 폼 값을 동기화
  });

  // Zustand에 값 저장
  const handleChangeField = useCallback(
    (key: TextAllowedKeys, value: string) => {
      setField('theme', key, value);
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
            <Controller
              control={control}
              name={key}
              render={({ field: { onChange, value, ref } }) => (
                <BaseEnglishTextInput
                  ref={ref} // react-hook-form의 ref 연결
                  maxLength={option.maxLength}
                  placeholder={`${option.label} 입력해주세요`}
                  value={value || ''}
                  onChange={(e) => {
                    // RHF 상태 업데이트
                    onChange(e);

                    // Zustand 전역 상태 업데이트
                    handleChangeField(key, e.target.value);
                  }}
                />
              )}
            />
          </Field>
        );
      })}
    </>
  );
};

export default ThemeTextFields;
