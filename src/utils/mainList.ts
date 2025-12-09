import type { FC } from 'react';

import AccountList from '@/components/account/AccountList';
import DateCalendar from '@/components/calendar/DateCalendar';
import Contact from '@/components/contact/Contact';
import Gallery from '@/components/gallery/Gallery';
import WeddingIntro from '@/components/Intro/WeddingIntro';
import Location from '@/components/location/Location';
import TransportList from '@/components/transport/TransportList';
import type { ActiveCheckbox } from '@/types/wedding';

type ShowKey = keyof ActiveCheckbox;

type MainList = {
  key: ShowKey;
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
    key: 'gallery',
    component: Gallery,
  },
  {
    key: 'location',
    component: Location,
  },
  {
    key: 'transport',
    component: TransportList,
  },
  {
    key: 'account',
    component: AccountList,
  },
] as const;
