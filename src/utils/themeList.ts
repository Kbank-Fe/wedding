import type { ThemeType } from '@/types/wedding';

type ThemeList = {
  type: ThemeType;
  groomEnglishName?: boolean;
  brideEnglishName?: boolean;
  mainPhrase?: boolean;
  subPhrase?: boolean;
  word1?: boolean;
  word2?: boolean;
  word3?: boolean;
};

export const themeList: ThemeList[] = [
  {
    type: 'CARDSLIDE',
    mainPhrase: true,
    subPhrase: true,
  },
  {
    type: 'FULL',
    word1: true,
    word2: true,
    word3: true,
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
    mainPhrase: true,
    subPhrase: true,
  },
  {
    type: 'ROUNDSLIDE',
    groomEnglishName: true,
    brideEnglishName: true,
    mainPhrase: true,
    subPhrase: true,
  },
];
