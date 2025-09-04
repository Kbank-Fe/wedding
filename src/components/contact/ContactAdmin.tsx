import React from 'react';

import BaseNumberKeypadTextInput from '@/components/shared/BaseNumberKeypadTextInput';
import Field from '@/components/shared/Field';
import Line from '@/components/shared/Line';
import { useWeddingStore } from '@/stores/useWeddingStore';

const ContactAdmin = () => {
  const setDeep = useWeddingStore((state) => state.setDeep);

  const contactList =
    useWeddingStore((state) => state.values.contact.contactList) || [];

  const handleBlur = (index: number) => {
    return (event: React.FocusEvent<HTMLInputElement>) => {
      const rawValue = event.target.value.replace(/\D/g, ''); // 숫자가 아닌 문자 공백 처리

      setDeep((dratf) => {
        if (dratf.contact.contactList) {
          dratf.contact.contactList[index].phone = rawValue;
        }
      });
    };
  };
  return (
    <>
      {contactList.map((contact, index) => (
        <React.Fragment key={index}>
          <Field
            key={index}
            description={`${contact.part} 연락처를 입력해주세요.`}
            label={contact.part}
            mode="single"
          >
            <BaseNumberKeypadTextInput
              placeholder="번호를 입력해주세요"
              onBlur={handleBlur(index)}
            />
          </Field>
          {index === 2 && <Line />} {/* 3번째 밑에만 Line 넣기 */}
        </React.Fragment>
      ))}
    </>
  );
};

export default ContactAdmin;
