import BaseImageInputPreview from '@/components//shared/BaseImageInputPreview';
import BaseRadioButtonScrollGroup from '@/components/shared/BaseRadioButtonScrollGroup';
import ThemeTextFields from '@/components/theme/ThemeTextFields';
import { useWeddingStore } from '@/stores/useWeddingStore';
import { themeList } from '@/utils/themeList';

const ThemeAdmin = () => {
  const setDeep = useWeddingStore((state) => state.setDeep);

  const themeText = useWeddingStore((state) => state.values.theme) || {};

  const localThemeItem = themeList.find((item) => item.type === themeText.type);

  const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedType = e.target.value;
    setDeep((draft) => {
      draft.theme.type = selectedType as typeof themeText.type;
    });
  };

  const themeScrollList = [
    { image: '/images/theme/cardslide.png', value: 'CARDSLIDE' },
    { image: '/images/theme/full.png', value: 'FULL' },
    { image: '/images/theme/monochrome.png', value: 'MONOCHROME' },
    { image: '/images/theme/polariod.png', value: 'POLAROID' },
    { image: '/images/theme/roundslide.png', value: 'ROUNDSLIDE' },
  ];

  return (
    <>
      <BaseRadioButtonScrollGroup
        items={themeScrollList.map((item) => ({
          ...item,
          checked: themeText.type === item.value,
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
