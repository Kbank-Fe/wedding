import type { ThemeType } from '@/types/wedding';

type ThemeList = {
  type: ThemeType;
  groomEnglishName: boolean;
  brideEnglishName: boolean;
  mainText: boolean;
  subText: boolean;
  addText: boolean;
};

export const themeList: ThemeList[] = [
  {
    type: 'CARDSLIDE',
    groomEnglishName: false,
    brideEnglishName: false,
    mainText: true,
    subText: true,
    addText: false,
  },
  {
    type: 'FULL',
    groomEnglishName: false,
    brideEnglishName: false,
    mainText: true,
    subText: true,
    addText: true,
  },
  {
    type: 'MONOCHROME',
    groomEnglishName: true,
    brideEnglishName: true,
    mainText: false,
    subText: false,
    addText: false,
  },
  {
    type: 'POLAROID',
    groomEnglishName: true,
    brideEnglishName: true,
    mainText: true,
    subText: true,
    addText: false,
  },
  {
    type: 'ROUNDSLIDE',
    groomEnglishName: true,
    brideEnglishName: true,
    mainText: true,
    subText: true,
    addText: false,
  },
];
