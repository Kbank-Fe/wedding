type TransportList = {
  transportList?: TransportItem[];
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
};
