import BaseImageInputPreview from '@/components//shared/BaseImageInputPreview';
import BaseRadioButtonScrollGroup from '@/components/shared/BaseRadioButtonScrollGroup';
import ThemeTextFields from '@/components/theme/ThemeTextFields';
import { useWeddingStore } from '@/stores/useWeddingStore';
import { themeList, themeScrollList } from '@/utils/themeList';

const ThemeAdmin = () => {
  const setField = useWeddingStore((state) => state.setField);

  const { type } = useWeddingStore((state) => state.values.theme);

  const localThemeItem = themeList.find((item) => item.type === type);

  const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField('theme', 'type', e.target.value as typeof type);
  };

  return (
    <>
      <BaseRadioButtonScrollGroup
        items={themeScrollList.map((item) => ({
          ...item,
          checked: type === item.value,
          onChange: handleChangeRadio,
        }))}
      />
      <ThemeTextFields localThemeItem={localThemeItem} />

      <BaseImageInputPreview
        label="테마 사진"
        multiple={localThemeItem?.image.multiple || false}
        weddingInfoKey="themeImage"
      />
    </>
  );
};

export default ThemeAdmin;
