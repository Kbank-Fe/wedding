import type { FC } from 'react';

import TransportAdmin from '@/components/transport/TransportAdmin';

type AdminList = {
  title: string;
  value: string;
  component: FC;
};

export const adminList: AdminList[] = [
  {
    title: '교통수단',
    value: 'transport',
    component: TransportAdmin,
  },
];
