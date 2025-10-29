import type { FC } from 'react';

import AccountList from '@/components/account/AccountList';
import DateCalendar from '@/components/calendar/DateCalendar';
import Contact from '@/components/contact/Contact';
import Gallery from '@/components/gallery/Gallery';
import WeddingIntro from '@/components/Intro/WeddingIntro';
import WeddingMap from '@/components/map/WeddingMap';
import FullTheme from '@/components/theme/FullTheme';
// import PolaroidTheme from '@/components/theme/PolaroidTheme';
import TransportList from '@/components/transport/TransportList';
import type { ShowCheckbox } from '@/types/wedding';

type ShowKey = keyof ShowCheckbox;

type MainList = {
  key: ShowKey;
  alwaysVisible?: boolean;
  isPadded?: boolean;
  component: FC;
};

export const mainList: MainList[] = [
  {
    key: 'theme',
    alwaysVisible: true,
    isPadded: false,
    component: FullTheme,
  },
  // {
  //   key: 'theme',
  //   alwaysVisible: true,
  //   component: PolaroidTheme,
  // },
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
    key: 'map',
    component: WeddingMap,
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
