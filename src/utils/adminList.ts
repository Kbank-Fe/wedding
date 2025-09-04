import type { FC } from 'react';

import DateCalendarAdmin from '@/components/calendar/DateCalendarAdmin';
import ContactAdmin from '@/components/contact/ContactAdmin';
import GalleryAdmin from '@/components/gallery/GalleryAdmin';
import TextEditorTest from '@/components/shared/TextEditorTest';
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
    {
    title: '텍스트 에디터 테스트',
    value: 'editor',
    component: TextEditorTest,
  },
];
