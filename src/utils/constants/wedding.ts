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
      { type: 'Groom', part: '신랑', phone: '' },
      { type: 'Groom', part: '아버지', phone: '' },
      { type: 'Groom', part: '어머니', phone: '' },
      { type: 'Bride', part: '신부', phone: '' },
      { type: 'Bride', part: '아버지', phone: '' },
      { type: 'Bride', part: '어머니', phone: '' },
    ],
  },
  account: {
    title: '',
    subtitle: '',
    groomSideAccounts: {
      title: '신랑측',
      accounts: [
        {
          bankName: '',
          accountNumber: '',
          accountHolder: '',
          isKakaopay: false,
          kakaopayUrl: '',
        },
      ],
      isExpand: false,
    },
    brideSideAccounts: {
      title: '신부측',
      accounts: [
        {
          bankName: '',
          accountNumber: '',
          accountHolder: '',
          isKakaopay: false,
          kakaopayUrl: '',
        },
      ],
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
  map: {
    title: '',
    venueName: '',
    venueDetail: '',
    address: '',
    isMapVisible: false,
  },
};
