import type { ThemeType } from '@/types/wedding';

type ThemeList = {
  type: ThemeType;
  groomEnglishName: boolean;
  brideEnglishName: boolean;
  mainPhrase: boolean;
  subPhrase: boolean;
  word1?: boolean;
  word2?: boolean;
  word3?: boolean;
};

export const themeList: ThemeList[] = [
  {
    type: 'CARDSLIDE',
    groomEnglishName: false,
    brideEnglishName: false,
    mainPhrase: true,
    subPhrase: true,
    word1: false,
    word2: false,
    word3: false,
  },
  {
    type: 'FULL',
    groomEnglishName: false,
    brideEnglishName: false,
    mainPhrase: false,
    subPhrase: false,
    word1: true,
    word2: true,
    word3: true,
  },
  {
    type: 'MONOCHROME',
    groomEnglishName: true,
    brideEnglishName: true,
    mainPhrase: false,
    subPhrase: false,
    word1: false,
    word2: false,
    word3: false,
  },
  {
    type: 'POLAROID',
    groomEnglishName: true,
    brideEnglishName: true,
    mainPhrase: true,
    subPhrase: true,
    word1: false,
    word2: false,
    word3: false,
  },
  {
    type: 'ROUNDSLIDE',
    groomEnglishName: true,
    brideEnglishName: true,
    mainPhrase: true,
    subPhrase: true,
    word1: false,
    word2: false,
    word3: false,
  },
];
