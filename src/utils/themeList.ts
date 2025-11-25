import type { ThemeType } from '@/types/wedding';

type TextInputOption = {
  isShow: boolean;
  maxLenth?: number;
};

type ThemeList = {
  type: ThemeType;
  groomEnglishName?: TextInputOption;
  brideEnglishName?: TextInputOption;
  text1?: TextInputOption;
  text2?: TextInputOption;
  text3?: TextInputOption;
};

export const themeList: ThemeList[] = [
  {
    type: 'CARDSLIDE',
    text1: { isShow: true, maxLenth: 10 },
    text2: { isShow: true, maxLenth: 10 },
  },
  {
    type: 'FULL',
    text1: { isShow: true, maxLenth: 5 },
    text2: { isShow: true, maxLenth: 5 },
    text3: { isShow: true, maxLenth: 5 },
  },
  {
    type: 'MONOCHROME',
    groomEnglishName: { isShow: true, maxLenth: 15 },
    brideEnglishName: { isShow: true, maxLenth: 15 },
  },
  {
    type: 'POLAROID',
    groomEnglishName: { isShow: true, maxLenth: 15 },
    brideEnglishName: { isShow: true, maxLenth: 15 },
    text1: { isShow: true, maxLenth: 10 },
    text2: { isShow: true, maxLenth: 10 },
  },
  {
    type: 'ROUNDSLIDE',
    groomEnglishName: { isShow: true, maxLenth: 15 },
    brideEnglishName: { isShow: true, maxLenth: 15 },
    text1: { isShow: true, maxLenth: 10 },
    text2: { isShow: true, maxLenth: 10 },
  },
];
