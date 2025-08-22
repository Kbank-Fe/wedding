import type { FC } from 'react';

import BaseTextArea from '@/components/shared/BaseTextArea';
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
  {
    title: 'textArea',
    value: 'textArea',
    component: BaseTextArea,
  },
];
