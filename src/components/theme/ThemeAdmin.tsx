import BaseRadioButtonScrollGroup from '@/components/shared/BaseRadioButtonScrollGroup';
import ThemeFields from '@/components/theme/ThemeFields';
import { useWeddingStore } from '@/stores/useWeddingStore';
import { themeList } from '@/utils/themeList';

const ThemeAdmin = () => {
  const setDeep = useWeddingStore((state) => state.setDeep);

  const theme = useWeddingStore((state) => state.values.theme) || {};

  const localThemeItem = themeList.find((item) => item.type === theme.type);

  const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedType = e.target.value;
    setDeep((draft) => {
      draft.theme.type = selectedType as typeof theme.type;
    });
  };

  const themeScrollList = [
    { image: '/images/theme_cardslide.png', value: 'CARDSLIDE' },
    { image: '/images/theme_full.png', value: 'FULL' },
    { image: '/images/theme_monochrome.png', value: 'MONOCHROME' },
    { image: '/images/theme_polariod.png', value: 'POLAROID' },
    { image: '/images/theme_roundslide.png', value: 'ROUNDSLIDE' },
  ];

  return (
    <>
      <BaseRadioButtonScrollGroup
        items={themeScrollList.map((item) => ({
          ...item,
          checked: theme.type === item.value,
          onChange: handleChangeRadio,
        }))}
      />
      <ThemeFields localThemeItem={localThemeItem} />
    </>
  );
};

export default ThemeAdmin;
