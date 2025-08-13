import { useEffect, useState } from 'react';

import BaseNumberKeypadTextInput from '@/components/shared/BaseNumberKeypadTextInput';
import Input from '@/components/shared/Input';

const ContactAdmin = () => {
  const [phone, setPhone] = useState<string>('');

  useEffect(() => {
    console.log('Selected phone:', phone);
  }, [phone]);

  const handleBlur = (text: string) => {
    setPhone(text);
  };
  return (
    <>
      <Input labelText="연락처">
        <BaseNumberKeypadTextInput
          placeholder="번호를 입력해주세요"
          onBlur={handleBlur}
        />
      </Input>
    </>
  );
};

export default ContactAdmin;
