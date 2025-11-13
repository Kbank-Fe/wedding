import type { FC } from 'react';

import AccountListAdmin from '@/components/account/AccountListAdmin';
import DateCalendarAdmin from '@/components/calendar/DateCalendarAdmin';
import ContactAdmin from '@/components/contact/ContactAdmin';
import GalleryAdmin from '@/components/gallery/GalleryAdmin';
import UserInfoAdmin from '@/components/Intro/UserInfoAdmin';
import WeddingGreetingAdmin from '@/components/Intro/WeddingGreetingAdmin';
import LocationAdmin from '@/components/location/LocationAdmin';
import TransportAdmin from '@/components/transport/TransportAdmin';
import type { ShowCheckbox } from '@/types/wedding';

type ShowKey = keyof ShowCheckbox;

type AdminList = {
  title: string;
  value: ShowKey;
  component: FC;
};

export const adminList: AdminList[] = [
  {
    title: '기본정보',
    value: 'basic',
    component: UserInfoAdmin,
  },
  {
    title: '인사말',
    value: 'greeting',
    component: WeddingGreetingAdmin,
  },
  {
    title: '연락하기',
    value: 'contact',
    component: ContactAdmin,
  },
  {
    title: '예식일자',
    value: 'calendar',
    component: DateCalendarAdmin,
  },
  {
    title: '갤러리',
    value: 'gallery',
    component: GalleryAdmin,
  },
  {
    title: '예식장소',
    value: 'location',
    component: LocationAdmin,
  },
  {
    title: '교통수단',
    value: 'transport',
    component: TransportAdmin,
  },
  {
    title: '계좌정보',
    value: 'account',
    component: AccountListAdmin,
  },
] as const;
