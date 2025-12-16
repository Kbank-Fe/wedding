import type { ThemeType } from '@/types/wedding';

type TextInputOption = {
  type: 'text';
  label: string;
  maxLength: number;
};

type ImageInputOption = {
  type: 'image';
  multiple: boolean;
  defaultImageList: string[];
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

/**
 * @TODO [THEME-ADD] 새로운 테마 추가 시 텍스트 입력이 아닌 경우 제외 필요합니다.
 * 'type'와 'image'를 제외한 나머지 키들은 텍스트 입력 필드에 해당, TextAllowedKeys 타입에서 제외
 */
export type TextAllowedKeys = keyof Omit<ThemeList, 'type' | 'image'>;

/**
 * @TODO [THEME-ADD] 새로운 테마 추가 시 입력 옵션을 정의해주세요.
 * ex) { type: 'NEWTHEME', text1: { type: 'text', label: '첫번째 문구', maxLength: 20 }, image: { type: 'image', multiple: false } }
 */
export const themeList: ThemeList[] = [
  {
    type: 'CARDSLIDE',
    text1: { type: 'text', label: '첫번째 문구', maxLength: 20 },
    text2: { type: 'text', label: '두번째 문구', maxLength: 20 },
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
    type: 'FULL',
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
    type: 'POLAROID',
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
    type: 'ROUNDSLIDE',
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
];
