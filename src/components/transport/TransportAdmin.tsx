import { useState } from 'react';

import TextInput from '@/components/shared/TextInput';

const TransportAdmin = () => {
  const [text, setText] = useState('');
  return (
    <div>
      <h1>Transport Admin</h1>
      <TextInput value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
};

export default TransportAdmin;
