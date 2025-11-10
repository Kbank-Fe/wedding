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

export type LocalImage = File | SavedImage;

export type Gallery = {
  localImageList: LocalImage[];
  savedImageList: SavedImage[];
};

export type SavedImage = {
  url: string;
  name: string;
  size: number;
  type: string;
  createdAt: number;
};

export type Intro = {
  title: string;
  content: string;
  showNames: boolean;
  alignment: TextAlignment;
  basicInfo: UserBasicInfo;
};

export type TextAlignment = 'left' | 'center' | 'right';

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

export type ShowCheckbox = {
  theme: boolean;
  intro: boolean;
  contact: boolean;
  calendar: boolean;
  account: boolean;
  transport: boolean;
  gallery: boolean;
  basic: boolean;
  map: boolean;
  greeting: boolean;
  share: boolean;
};

type WeddingMap = {
  title: string;
  venueName: string;
  venueDetail: string;
  address: string;
  isVisibleMap: boolean;
};

export type WeddingInfo = {
  date: DateInfo;
  contact: ContactList;
  account: AccountList;
  intro: Intro;
  transport: TransportList;
  gallery: Gallery;
  showCheckbox: ShowCheckbox;
  map: WeddingMap;
};
