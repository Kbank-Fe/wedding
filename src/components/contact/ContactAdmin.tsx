import { useEffect, useState } from 'react';

import BaseNumberKeypadTextInput from '@/components/shared/BaseNumberKeypadTextInput';

const ContactAdmin = () => {
  const [phone, setPhone] = useState<string>('');

  useEffect(() => {
    console.log('Selected phone:', phone);
  }, [phone]);

  const handleEmit = (text: string) => {
    setPhone(text);
  };
  return (
    <>
      <BaseNumberKeypadTextInput
        placeholder="번호를 입력해주세요"
        onEmit={handleEmit}
      />
    </>
  );
};

export default ContactAdmin;
