import type { WeddingInfo } from '@/types/wedding';

export const WEDDING_INITIAL_INFO: WeddingInfo = {
  date: {
    year: '',
    month: '',
    day: '',
    hour: '',
    min: '',
  },
  contact: {
    contactList: [],
  },
  account: {
    title: '',
    subtitle: '',
    groomSideAccounts: {
      title: '신랑측',
      accounts: [],
      isExpand: false,
    },
    brideSideAccounts: {
      title: '신부측',
      accounts: [],
      isExpand: false,
    },
  },
  intro: {
    title: '',
    content: '',
    showNames: true,
    alignment: 'center',
    basicInfo: [
      {
        maleName: '홍길동',
        maleFatherName: '홍아버지',
        maleMotherName: '홍어머니',
        femaleName: '김영희',
        femaleFatherName: '김아버지',
        femaleMotherName: '김어머니',
      },
    ],
  },
  transport: {
    transportList: Array.from({ length: 4 }, () => ({
      title: '',
      description: '',
    })),
  },
  gallery: {
    localImageList: [],
    savedImageList: [],
  },
};
