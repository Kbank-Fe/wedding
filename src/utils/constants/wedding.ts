import type { WeddingInfo } from '@/types/wedding';

export const WEDDING_INITIAL_INFO: WeddingInfo = {
  theme: {
    type: 'CARDSLIDE',
    groomEnglishName: 'Kim KKK',
    brideEnglishName: 'Park HHH',
    text1: 'our',
    text2: 'wedding',
    text3: 'day',
  },
  themeImage: {
    localImageList: [],
    savedImageList: [],
  },
  activeCheckbox: {
    theme: true,
    intro: true,
    contact: false,
    calendar: true,
    account: true,
    transport: true,
    gallery: true,
    basic: true,
    location: true,
    greeting: true,
    share: false,
  },
  basicInfo: {
    maleName: '',
    femaleName: '',
    maleFatherName: '',
    maleFatherDeceased: false,
    maleMotherName: '',
    maleMotherDeceased: false,
    femaleFatherName: '',
    femaleFatherDeceased: false,
    femaleMotherName: '',
    femaleMotherDeceased: false,
  },
  intro: {
    title: '초대합니다',
    content: `<p>언제나 서로의 길에 빛이</p><p>되어주기로 약속했습니다.</p><p><br></p><p>축복 속에서 사랑을 꽃 피울 수 있도록</p><p>행복한 저희의 이야기를 지켜봐주세요.</p><p><br></p><p>오로지 믿음과 사랑을 약속하는 날</p><p>오셔서 축복해주시면 더 없는 기쁨으로</p><p>간직하겠습니다.</p>`,
    showNames: true,
    alignment: 'center',
  },
  contact: {
    contactList: [
      { type: 'Groom', part: '신랑', phone: '' },
      { type: 'Groom', part: '신랑 아버지', phone: '' },
      { type: 'Groom', part: '신랑 어머니', phone: '' },
      { type: 'Bride', part: '신부', phone: '' },
      { type: 'Bride', part: '신부 아버지', phone: '' },
      { type: 'Bride', part: '신부 어머니', phone: '' },
    ],
  },
  date: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 2,
    day: new Date().getDate(),
    hour: 12,
    min: 0,
  },
  gallery: {
    localImageList: [],
    savedImageList: [],
  },
  location: {
    venueName: '더컨벤션',
    venueDetail: '3층 라온홀',
    address: '서울 영등포구 국회대로38길 2',
    isVisibleMap: true,
  },
  transport: {
    transportList: [
      {
        title: '지하철 이용 시',
        description: `<p>2호선 또는 5호선 영등포구청역 4번 출구 (영등포 경찰서 방면 도보 3분 거리)</p>`,
      },
      ...Array.from({ length: 3 }, () => ({ title: '', description: '' })),
    ],
  },
  account: {
    title: '축하의 마음을 전해주세요',
    subtitle: '',
    groomSideAccounts: {
      title: '신랑측',
      accounts: [
        {
          accountHolder: '김케이',
          bankName: '케이뱅크',
          accountNumber: '123456789',
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
          accountHolder: '김케이',
          bankName: '케이뱅크',
          accountNumber: '123456789',
          isKakaopay: false,
          kakaopayUrl: '',
        },
      ],
      isExpand: true,
    },
  },
  share: {
    title: '사랑이 머문 시간, 이제 결혼으로 이어집니다.',
    description: '행복한 날, 함께해주시면 감사하겠습니다.',
    kakaoShare: true,
    linkShare: true,
    localImageList: [],
    savedImageList: [],
  },
};
