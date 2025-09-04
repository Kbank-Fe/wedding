import React from 'react';

import BaseNumberKeypadTextInput from '@/components/shared/BaseNumberKeypadTextInput';
import Field from '@/components/shared/Field';
import Line from '@/components/shared/Line';
import { useWeddingStore } from '@/stores/useWeddingStore';

const ContactAdmin = () => {
  const setDeep = useWeddingStore((state) => state.setDeep);

  const contactList =
    useWeddingStore((state) => state.values.contact.contactList) || [];

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
              value={contact.phone}
              onBlurValue={(rawValue) =>
                setDeep((draft) => {
                  if (draft.contact.contactList) {
                    draft.contact.contactList[index].phone = rawValue; // blur 때만 저장
                  }
                })
              }
            />
          </Field>
          {index === 2 && <Line />} {/* 3번째 밑에만 Line 넣기 */}
        </React.Fragment>
      ))}
    </>
  );
};

export default ContactAdmin;
