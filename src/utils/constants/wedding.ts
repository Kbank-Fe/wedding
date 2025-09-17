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
        maleName: '',
        femaleName: '',
        maleFatherName: '',
        maleMotherName: '',
        femaleFatherName: '',
        femaleMotherName: '',
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
