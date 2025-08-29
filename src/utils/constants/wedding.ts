import type { WeddingInfo } from '@/types/wedding';

export const WEDDING_INITIAL_INFO: WeddingInfo = {
  date: {
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    min: 0,
  },
  contact: {
    contactList: [
      { type: '신랑', phone: '' },
      { type: '아버지', phone: '' },
      { type: '어머니', phone: '' },
      { type: '신부', phone: '' },
      { type: '아버지', phone: '' },
      { type: '어머니', phone: '' },
    ],
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
    basicInfo: [],
  },
  transport: {
    transportList: [],
  },
};
