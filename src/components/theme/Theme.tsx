import CardSlideTheme from '@/components/theme/CardSlideTheme';
import FullTheme from '@/components/theme/FullTheme';
import MonochromeTheme from '@/components/theme/MonochromeTheme';
import PolaroidTheme from '@/components/theme/PolaroidTheme';
import RoundSlideTheme from '@/components/theme/RoundSlideTheme';
import { useWeddingStore } from '@/stores/useWeddingStore';

const Theme = () => {
  const type =
    useWeddingStore((state) => state.values.theme.type) || 'CARDSLIDE';
  return (
    <>
      {type === 'CARDSLIDE' && <CardSlideTheme />}
      {type === 'FULL' && <FullTheme />}
      {type === 'MONOCHROME' && <MonochromeTheme />}
      {type === 'POLAROID' && <PolaroidTheme />}
      {type === 'ROUNDSLIDE' && <RoundSlideTheme />}
    </>
  );
};
export default Theme;
