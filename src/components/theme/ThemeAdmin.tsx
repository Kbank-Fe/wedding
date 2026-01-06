import BaseImageInputPreview from '@/components//shared/BaseImageInputPreview';
import BaseRadioButtonScrollGroup from '@/components/shared/BaseRadioButtonScrollGroup';
import ThemeTextFields from '@/components/theme/ThemeTextFields';
import { useWeddingStore } from '@/stores/useWeddingStore';
import type { ThemeType } from '@/types/wedding';
import { THEME_TEXT_DEFAULT } from '@/utils/constants/wedding';
import { themeList, themeScrollList } from '@/utils/themeList';

const ThemeAdmin = () => {
  const setDeep = useWeddingStore((state) => state.setDeep);

  const { type } = useWeddingStore((state) => state.values.theme);

  const localThemeItem = themeList.find((item) => item.type === type);

  const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextType = e.target.value as ThemeType;

    setDeep((draft) => {
      draft.theme.type = nextType;

      Object.assign(draft.theme, THEME_TEXT_DEFAULT);

      draft.themeImage = {
        localImageList: [],
        savedImageList: [],
      };
    });
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
