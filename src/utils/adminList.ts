import type { FC } from 'react';

import DateCalendarAdmin from '@/components/calendar/DateCalendarAdmin';
import ContactAdmin from '@/components/contact/ContactAdmin';
import GalleryAdmin from '@/components/gallery/GalleryAdmin';
import TransportAdmin from '@/components/transport/TransportAdmin';

type AdminList = {
  title: string;
  value: string;
  component: FC;
};

export const adminList: AdminList[] = [
  {
    title: '예식일자',
    value: 'calendar',
    component: DateCalendarAdmin,
  },
  {
    title: '연락하기',
    value: 'contact',
    component: ContactAdmin,
  },
  {
    title: '교통수단',
    value: 'transport',
    component: TransportAdmin,
  },
  {
    title: '갤러리',
    value: 'gallery',
    component: GalleryAdmin,
  },
];
