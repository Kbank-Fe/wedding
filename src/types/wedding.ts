type TransportList = {
  transportList: TransportItem[];
};

type TransportItem = {
  title: string;
  description: string;
};

type DateInfo = {
  year: number;
  month: number;
  day: number;
  hour: number;
  min: number;
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

type AccountList = {
  title?: string;
  subtitle?: string;
  groomSideAccounts?: AccountInfo;
  brideSideAccounts?: AccountInfo;
};

export type AccountInfo = {
  title?: string;
  accounts: Account[];
  isExpand: boolean;
};

export type Account = {
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
  basicInfo: UserBasicInfo[];
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
  date: DateInfo;
  contact: ContactList;
  account: AccountList;
  intro: Intro;
  transport: TransportList;
  gallery: Gallery;
};
