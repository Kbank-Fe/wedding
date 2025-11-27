import type { ThemeType } from '@/types/wedding';

type TextInputOption = {
  label: string;
  isShow: boolean;
  maxLength: number;
};

export type ThemeList = {
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
    text1: { label: '첫번째 문구', isShow: true, maxLength: 10 },
    text2: { label: '두번째 문구', isShow: true, maxLength: 10 },
  },
  {
    type: 'FULL',
    text1: { label: '첫번째 문구', isShow: true, maxLength: 5 },
    text2: { label: '두번째 문구', isShow: true, maxLength: 5 },
    text3: { label: '세번째 문구', isShow: true, maxLength: 5 },
  },
  {
    type: 'MONOCHROME',
    groomEnglishName: { label: '신랑 영문명', isShow: true, maxLength: 15 },
    brideEnglishName: { label: '신부 영문명', isShow: true, maxLength: 15 },
  },
  {
    type: 'POLAROID',
    groomEnglishName: { label: '신랑 영문명', isShow: true, maxLength: 15 },
    brideEnglishName: { label: '신부 영문명', isShow: true, maxLength: 15 },
    text1: { label: '첫번째 문구', isShow: true, maxLength: 10 },
    text2: { label: '두번째 문구', isShow: true, maxLength: 10 },
  },
  {
    type: 'ROUNDSLIDE',
    groomEnglishName: { label: '신랑 영문명', isShow: true, maxLength: 15 },
    brideEnglishName: { label: '신부 영문명', isShow: true, maxLength: 15 },
    text1: { label: '첫번째 문구', isShow: true, maxLength: 10 },
    text2: { label: '두번째 문구', isShow: true, maxLength: 10 },
  },
];
