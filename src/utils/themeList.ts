import type { ThemeType } from '@/types/wedding';

type ThemeList = {
  type: ThemeType;
  groomEnglishName?: boolean;
  brideEnglishName?: boolean;
  text1?: boolean;
  text2?: boolean;
  text3?: boolean;
};

export const themeList: ThemeList[] = [
  {
    type: 'CARDSLIDE',
    text1: true,
    text2: true,
  },
  {
    type: 'FULL',
    text1: true,
    text2: true,
    text3: true,
  },
  {
    type: 'MONOCHROME',
    groomEnglishName: true,
    brideEnglishName: true,
  },
  {
    type: 'POLAROID',
    groomEnglishName: true,
    brideEnglishName: true,
    text1: true,
    text2: true,
  },
  {
    type: 'ROUNDSLIDE',
    groomEnglishName: true,
    brideEnglishName: true,
    text1: true,
    text2: true,
  },
];
