/**
 * @TODO [THEME-ADD] 새로운 테마 추가 시 타입을 정의해주세요.
 * ex) 'NEWTHEME'
 */
export type ThemeType =
  | 'CARDSLIDE'
  | 'FULL'
  | 'MONOCHROME'
  | 'POLAROID'
  | 'ROUNDSLIDE';

/**
 * @TODO [THEME-ADD] 새로운 테마 추가 시 타입 입력 항목을 정의해주세요.
 * ex) newthemeText1, newthemeText2
 * 이미지 입력 항목은 ThemeImage 타입을 사용하기 때문에 별도 정의 불필요
 */
export type Theme = {
  type?: ThemeType;
  groomEnglishName?: string;
  brideEnglishName?: string;
  text1?: string;
  text2?: string;
  text3?: string;
};

export type ThemeImage = {
  localImageList: LocalImage[];
  savedImageList: SavedImage[];
};

export type ActiveCheckbox = {
  theme: boolean;
  intro: boolean;
  contact: boolean;
  calendar: boolean;
  account: boolean;
  transport: boolean;
  gallery: boolean;
  basic: boolean;
  location: boolean;
  greeting: boolean;
  share: boolean;
};

export type UserBasicInfo = UserBasicInfoString & UserBasicInfoBoolean;

export type UserBasicInfoString = {
  maleName?: string;
  femaleName?: string;
  maleFatherName?: string;
  maleMotherName?: string;
  femaleFatherName?: string;
  femaleMotherName?: string;
};

export type UserBasicInfoBoolean = {
  maleFatherDeceased?: boolean;
  maleMotherDeceased?: boolean;
  femaleFatherDeceased?: boolean;
  femaleMotherDeceased?: boolean;
};

export type TextAlignment = 'left' | 'center' | 'right';

export type Intro = {
  title: string;
  content: string;
  showNames: boolean;
  alignment: TextAlignment;
};

type Contact = 'Groom' | 'Bride';

type ContactItem = {
  type: Contact;
  part: string;
  phone: string;
};

type ContactList = {
  contactList?: ContactItem[];
};

type DateInfo = {
  year: number;
  month: number;
  day: number;
  hour: number;
  min: number;
};

export type LocalImage = File | SavedImage;

export type SavedImage = {
  url: string;
  name: string;
  size: number;
  type: string;
  createdAt: number;
};

export type Gallery = {
  localImageList: LocalImage[];
  savedImageList: SavedImage[];
};

type Location = {
  venueName: string;
  venueDetail: string;
  address: string;
  isVisibleMap: boolean;
};

type TransportItem = {
  title: string;
  description: string;
};

type TransportList = {
  transportList: TransportItem[];
};

export type Account = {
  accountHolder: string;
  bankName: string;
  accountNumber: string;
  isKakaopay?: boolean;
  kakaopayUrl?: string;
};

export type AccountInfo = {
  title?: string;
  accounts: Account[];
  isExpand: boolean;
};

type AccountList = {
  title?: string;
  subtitle?: string;
  groomSideAccounts?: AccountInfo;
  brideSideAccounts?: AccountInfo;
};

export type FooterShare = {
  title: string;
  description: string;
  kakaoShare: boolean;
  linkShare: boolean;
  localImageList: LocalImage[];
  savedImageList: SavedImage[];
};

/**
 * @TODO [IMAGE-ADD] 새로운 이미지 입력 key 추가 시 타입을 정의해주세요.
 * image 입력 필드에 해당하는 키들만 포함
 */
export type ImageAllowedKeys = keyof Pick<
  WeddingInfo,
  'themeImage' | 'gallery' | 'share'
>;

export type WeddingInfo = {
  theme: Theme;
  themeImage: ThemeImage;
  activeCheckbox: ActiveCheckbox;
  basicInfo: UserBasicInfo;
  intro: Intro;
  contact: ContactList;
  date: DateInfo;
  gallery: Gallery;
  location: Location;
  transport: TransportList;
  account: AccountList;
  share: FooterShare;
};
