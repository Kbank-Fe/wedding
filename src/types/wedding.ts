export type ThemeType =
  | 'CARDSLIDE'
  | 'FULL'
  | 'MONOCHROME'
  | 'POLAROID'
  | 'ROUNDSLIDE';

export type Theme = {
  type?: ThemeType;
  groomEnglishName?: string;
  brideEnglishName?: string;
  text1?: string;
  text2?: string;
  text3?: string;
};

export type ShowCheckbox = {
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
  file?: LocalImage[];
  uploadMeta?: SavedImage[];
};

export type WeddingInfo = {
  theme: Theme;
  showCheckbox: ShowCheckbox;
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
