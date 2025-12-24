import type { ThemeType } from '@/types/wedding';

export type TextInputOption = {
  type: 'text';
  label: string;
  maxLength: number;
};

export type ImageInputOption = {
  type: 'image';
  multiple: boolean;
  defaultImageList: string[];
};

export type ThemeUIMeta = {
  scrollImage: string;
  order: number;
};

export type ThemeList = {
  type: ThemeType;
  ui: ThemeUIMeta;
  image: ImageInputOption;

  groomEnglishName?: TextInputOption;
  brideEnglishName?: TextInputOption;
  text1?: TextInputOption;
  text2?: TextInputOption;
  text3?: TextInputOption;
};

type TextOptionKeys<T> = {
  [K in keyof T]: T[K] extends TextInputOption ? K : never;
}[keyof T];

/**
 * 텍스트 입력 필드로 허용되는 키
 * → TextInputOption인 속성만 자동 추출
 */
export type TextAllowedKeys = TextOptionKeys<ThemeList>;

/**
 * @TODO [THEME-ADD] 새로운 테마 추가 시 입력 옵션을 정의해주세요.
 * ex) { type: 'NEWTHEME', text1: { type: 'text', label: '첫번째 문구', maxLength: 20 }, image: { type: 'image', multiple: false } }
 */

export const themeList = [
  {
    type: 'POLAROID',
    ui: {
      scrollImage: '/images/theme/polariod.png',
      order: 1,
    },
    groomEnglishName: {
      type: 'text',
      label: '신랑 영문명',
      maxLength: 15,
    },
    brideEnglishName: {
      type: 'text',
      label: '신부 영문명',
      maxLength: 15,
    },
    text1: { type: 'text', label: '첫번째 문구', maxLength: 10 },
    text2: { type: 'text', label: '두번째 문구', maxLength: 10 },
    image: {
      type: 'image',
      multiple: false,
      defaultImageList: ['/images/theme/polariod_default.png'],
    },
  },
  {
    type: 'FULL',
    ui: {
      scrollImage: '/images/theme/full.png',
      order: 2,
    },
    text1: { type: 'text', label: '첫번째 문구', maxLength: 10 },
    text2: { type: 'text', label: '두번째 문구', maxLength: 10 },
    text3: { type: 'text', label: '세번째 문구', maxLength: 10 },
    image: {
      type: 'image',
      multiple: false,
      defaultImageList: ['/images/theme/full_default.png'],
    },
  },
  {
    type: 'MONOCHROME',
    ui: {
      scrollImage: '/images/theme/monochrome.png',
      order: 3,
    },
    groomEnglishName: {
      type: 'text',
      label: '신랑 영문명',
      maxLength: 15,
    },
    brideEnglishName: {
      type: 'text',
      label: '신부 영문명',
      maxLength: 15,
    },
    image: {
      type: 'image',
      multiple: false,
      defaultImageList: ['/images/theme/monochrome_default.png'],
    },
  },
  {
    type: 'CARDSLIDE',
    ui: {
      scrollImage: '/images/theme/cardslide.png',
      order: 4,
    },
    text1: { type: 'text', label: '첫번째 문구', maxLength: 45 },
    text2: { type: 'text', label: '두번째 문구', maxLength: 45 },
    image: {
      type: 'image',
      multiple: true,
      defaultImageList: [
        '/images/theme/cardslide_default.png',
        '/images/theme/cardslide_default2.png',
      ],
    },
  },
  {
    type: 'ROUNDSLIDE',
    ui: {
      scrollImage: '/images/theme/roundslide.png',
      order: 5,
    },
    groomEnglishName: {
      type: 'text',
      label: '신랑 영문명',
      maxLength: 15,
    },
    brideEnglishName: {
      type: 'text',
      label: '신부 영문명',
      maxLength: 15,
    },
    text1: { type: 'text', label: '첫번째 문구', maxLength: 10 },
    text2: { type: 'text', label: '두번째 문구', maxLength: 10 },
    image: {
      type: 'image',
      multiple: true,
      defaultImageList: [
        '/images/theme/roundslide_default.png',
        '/images/theme/roundslide_default2.png',
      ],
    },
  },
] as const satisfies readonly ThemeList[];

type ThemeTypeFromList = (typeof themeList)[number]['type'];

export type ThemeScrollItem = {
  value: ThemeTypeFromList;
  image: string;
};

export const themeScrollList: ThemeScrollItem[] = [...themeList]
  .sort((a, b) => a.ui.order - b.ui.order)
  .map((theme) => ({
    value: theme.type,
    image: theme.ui.scrollImage,
  }));
