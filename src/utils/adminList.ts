import type { FC } from 'react';

import AccountListAdmin from '@/components/account/AccountListAdmin';
import DateCalendarAdmin from '@/components/calendar/DateCalendarAdmin';
import ContactAdmin from '@/components/contact/ContactAdmin';
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
    title: '계좌정보',
    value: 'account',
    component: AccountListAdmin,
  },
];
