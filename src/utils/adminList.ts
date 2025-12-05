import type { FC } from 'react';

import AccountListAdmin from '@/components/account/AccountListAdmin';
import DateCalendarAdmin from '@/components/calendar/DateCalendarAdmin';
import ContactAdmin from '@/components/contact/ContactAdmin';
import ShareAdmin from '@/components/footer/ShareAdmin';
import GalleryAdmin from '@/components/gallery/GalleryAdmin';
import UserInfoAdmin from '@/components/Intro/UserInfoAdmin';
import WeddingGreetingAdmin from '@/components/Intro/WeddingGreetingAdmin';
import LocationAdmin from '@/components/location/LocationAdmin';
import ThemeAdmin from '@/components/theme/ThemeAdmin';
import TransportAdmin from '@/components/transport/TransportAdmin';
import type { ActiveCheckbox } from '@/types/wedding';

type ShowKey = keyof ActiveCheckbox;

type AdminList = {
  title: string;
  value: ShowKey;
  component: FC;
  showCheckbox?: boolean;
};

export const adminList: AdminList[] = [
  {
    title: '테마',
    value: 'theme',
    component: ThemeAdmin,
    required: true,
  },
  {
    title: '기본정보',
    value: 'basic',
    component: UserInfoAdmin,
  },
  {
    title: '인사말',
    value: 'greeting',
    component: WeddingGreetingAdmin,
    showCheckbox: true,
  },
  {
    title: '연락하기',
    value: 'contact',
    component: ContactAdmin,
    showCheckbox: true,
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
    showCheckbox: true,
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
    showCheckbox: true,
  },
  {
    title: '계좌정보',
    value: 'account',
    component: AccountListAdmin,
    showCheckbox: true,
  },
  {
    title: '공유하기',
    value: 'share',
    component: ShareAdmin,
    showCheckbox: true,
  },
] as const;
