import type { ThemeType } from '@/types/wedding';

type TextInputOption = {
  type: 'text';
  label: string;
  isShow: boolean;
  maxLength: number;
};

type ImageInputOption = {
  type: 'image';
  multiple: boolean;
};

export type ThemeList = {
  type: ThemeType;
  image: ImageInputOption;
  groomEnglishName?: TextInputOption;
  brideEnglishName?: TextInputOption;
  text1?: TextInputOption;
  text2?: TextInputOption;
  text3?: TextInputOption;
};

export const themeList: ThemeList[] = [
  {
    type: 'CARDSLIDE',
    text1: { type: 'text', label: '첫번째 문구', isShow: true, maxLength: 20 },
    text2: { type: 'text', label: '두번째 문구', isShow: true, maxLength: 20 },
    image: { type: 'image', multiple: true },
  },
  {
    type: 'FULL',
    text1: { type: 'text', label: '첫번째 문구', isShow: true, maxLength: 10 },
    text2: { type: 'text', label: '두번째 문구', isShow: true, maxLength: 10 },
    text3: { type: 'text', label: '세번째 문구', isShow: true, maxLength: 10 },
    image: { type: 'image', multiple: false },
  },
  {
    type: 'MONOCHROME',
    groomEnglishName: {
      type: 'text',
      label: '신랑 영문명',
      isShow: true,
      maxLength: 15,
    },
    brideEnglishName: {
      type: 'text',
      label: '신부 영문명',
      isShow: true,
      maxLength: 15,
    },
    image: { type: 'image', multiple: false },
  },
  {
    type: 'POLAROID',
    groomEnglishName: {
      type: 'text',
      label: '신랑 영문명',
      isShow: true,
      maxLength: 15,
    },
    brideEnglishName: {
      type: 'text',
      label: '신부 영문명',
      isShow: true,
      maxLength: 15,
    },
    text1: { type: 'text', label: '첫번째 문구', isShow: true, maxLength: 10 },
    text2: { type: 'text', label: '두번째 문구', isShow: true, maxLength: 10 },
    image: { type: 'image', multiple: false },
  },
  {
    type: 'ROUNDSLIDE',
    groomEnglishName: {
      type: 'text',
      label: '신랑 영문명',
      isShow: true,
      maxLength: 15,
    },
    brideEnglishName: {
      type: 'text',
      label: '신부 영문명',
      isShow: true,
      maxLength: 15,
    },
    text1: { type: 'text', label: '첫번째 문구', isShow: true, maxLength: 10 },
    text2: { type: 'text', label: '두번째 문구', isShow: true, maxLength: 10 },
    image: { type: 'image', multiple: true },
  },
];
