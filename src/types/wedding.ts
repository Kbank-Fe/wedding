type TransportList = {
  transportList: TransportItem[];
};

type TransportItem = {
  title: string;
  description: string;
};

type DateInfo = {
  year: string;
  month: string;
  day: string;
  hour: string;
  min?: string;
};

type ContactItem = {
  phone: string;
  type: string;
};

type ContactList = {
  contactList?: ContactItem[];
};

type AccountList = {
  title?: string;
  subtitle?: string;
  groomSideAccounts?: AccountInfo;
  brideSideAccounts?: AccountInfo;
};

type AccountInfo = {
  title?: string;
  accounts: Account[];
  isExpand: boolean;
};

type Account = {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  isKakaopay?: boolean;
  kakaopayUrl?: string;
};

type Gallery = {
  localImageList: File[];
  savedImageList: SavedImage[];
};

export type SavedImage = {
  url: string;
  name: string;
};

export type Intro = {
  title: string;
  content: string;
  showNames: boolean;
  alignment: TextAlignment;
  basicInfo: [{
      maleName: '홍길동',
      maleFatherName: '홍아버지',
      maleMotherName: '홍어머니',
      femaleName: '김영희',
      femaleFatherName: '김아버지',
      femaleMotherName: '김어머니',
    }],
};

export type TextAlignment = 'left' | 'center' | 'right';

export type UserBasicInfo = {
  maleName?: string;
  femaleName?: string;
  maleFatherName?: string;
  maleMotherName?: string;
  femaleFatherName?: string;
  femaleMotherName?: string;
};

export type WeddingInfo = {
  draft: any;
  date: DateInfo;
  contact: ContactList;
  account: AccountList;
  intro: Intro;
  transport: TransportList;
  gallery: Gallery;
};
