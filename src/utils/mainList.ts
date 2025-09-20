import type { FC } from 'react';

import AccountList from '@/components/account/AccountList';
import DateCalendar from '@/components/calendar/DateCalendar';
import Contact from '@/components/contact/Contact';
import Gallery from '@/components/gallery/Gallery';
import WeddingIntro from '@/components/Intro/WeddingIntro';
import TransportList from '@/components/transport/TransportList';

type MainList = {
  key: string;
  alwaysVisible?: boolean;
  component: FC;
};

export const mainList: MainList[] = [
  {
    key: 'intro',
    alwaysVisible: true,
    component: WeddingIntro,
  },
  {
    key: 'contact',
    component: Contact,
  },
  {
    key: 'calendar',
    component: DateCalendar,
  },
  {
    key: 'account',
    component: AccountList,
  },
  {
    key: 'transport',
    component: TransportList,
  },
  {
    key: 'gallery',
    component: Gallery,
  },
];
