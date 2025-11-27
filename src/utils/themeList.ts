import type { ThemeType } from '@/types/wedding';

type TextInputOption = {
  isShow: boolean;
  maxLength: number;
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
    text1: { isShow: true, maxLength: 10 },
    text2: { isShow: true, maxLength: 10 },
  },
  {
    type: 'FULL',
    text1: { isShow: true, maxLength: 5 },
    text2: { isShow: true, maxLength: 5 },
    text3: { isShow: true, maxLength: 5 },
  },
  {
    type: 'MONOCHROME',
    groomEnglishName: { isShow: true, maxLength: 15 },
    brideEnglishName: { isShow: true, maxLength: 15 },
  },
  {
    type: 'POLAROID',
    groomEnglishName: { isShow: true, maxLength: 15 },
    brideEnglishName: { isShow: true, maxLength: 15 },
    text1: { isShow: true, maxLength: 10 },
    text2: { isShow: true, maxLength: 10 },
  },
  {
    type: 'ROUNDSLIDE',
    groomEnglishName: { isShow: true, maxLength: 15 },
    brideEnglishName: { isShow: true, maxLength: 15 },
    text1: { isShow: true, maxLength: 10 },
    text2: { isShow: true, maxLength: 10 },
  },
];
