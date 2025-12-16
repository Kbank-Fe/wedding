import BaseImageInputPreview from '@/components//shared/BaseImageInputPreview';
import BaseRadioButtonScrollGroup from '@/components/shared/BaseRadioButtonScrollGroup';
import ThemeTextFields from '@/components/theme/ThemeTextFields';
import { useWeddingStore } from '@/stores/useWeddingStore';
import { themeList } from '@/utils/themeList';

const ThemeAdmin = () => {
  const setField = useWeddingStore((state) => state.setField);

  const { type } = useWeddingStore((state) => state.values.theme);

  const localThemeItem = themeList.find((item) => item.type === type);

  const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField('theme', 'type', e.target.value as typeof type);
  };

  /**
   * @TODO [THEME-ADD] 새로운 테마 추가 시 샘플 이미지 경로와 값을 추가해주세요.
   * ex) { image: '/images/theme/newtheme.png', value: 'NEWTHEME' }
   */
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
