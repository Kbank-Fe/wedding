import { useState } from 'react';

import TextInput from '@/components/shared/TextInput';

type TransportList = {
  transportList?: TransportItem[];
};

type TransportItem = {
  title?: string;
  description?: string;
};

const TransportAdmin = () => {
  const [text1, setText1] = useState({ title1, title2 });

  return (
    <div>
      <h1>Transport Admin</h1>
      <TextInput label="교통수단1" maxLength={10} placeholder="testsets" />
      <TextInput label="교통수단1" maxLength={10} placeholder="testsets" />
      <TextInput label="교통수단1" maxLength={10} placeholder="testsets" />
      <TextInput label="교통수단1" maxLength={10} placeholder="testsets" />
    </div>
  );
};

export default TransportAdmin;
