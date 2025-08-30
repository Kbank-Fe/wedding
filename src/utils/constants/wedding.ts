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
      { type: 'G', part: '신랑', phone: '' },
      { type: 'G', part: '아버지', phone: '' },
      { type: 'G', part: '어머니', phone: '' },
      { type: 'B', part: '신부', phone: '' },
      { type: 'B', part: '아버지', phone: '' },
      { type: 'B', part: '어머니', phone: '' },
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
