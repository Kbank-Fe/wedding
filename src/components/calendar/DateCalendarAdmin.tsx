import { useEffect, useRef } from 'react';

import BaseDateInput from '@/components/shared/BaseDateInput';
import BaseSelect from '@/components/shared/BaseSelect';
import Field from '@/components/shared/Field';
import { useWeddingStore } from '@/stores/useWeddingStore';
import { HOUR_OPTION_LIST, MINUTE_OPTION_LIST } from '@/utils/constants/time';

const DateCalendarAdmin = () => {
  const setField = useWeddingStore((state) => state.setField);

  // 부모가 자식의 input DOM을 직접 제어
  const inputRef = useRef<HTMLInputElement>(null);
  const calledRef = useRef(false);

  useEffect(() => {
    if (!calledRef.current && inputRef.current) {
      const dateObject = new Date(inputRef.current.value);
      setField('date', 'year', dateObject.getFullYear());
      setField('date', 'month', dateObject.getMonth() + 1);
      setField('date', 'day', dateObject.getDate());

      // 최초 1회만 호출
      calledRef.current = true;
    }
  }, [setField]);

  const hour = useWeddingStore((state) => state.values.date.hour);
  const minute = useWeddingStore((state) => state.values.date.min);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateObject = new Date(e.target.value);
    setField('date', 'year', dateObject.getFullYear());
    setField('date', 'month', dateObject.getMonth() + 1);
    setField('date', 'day', dateObject.getDate());
  };

  const handleChangeHour = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setField('date', 'hour', Number(event.currentTarget.value));
  };

  const handleChangeMinute = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setField('date', 'min', Number(event.currentTarget.value));
  };

  return (
    <>
      <Field
        description="예식일자를 선택해주세요."
        label="예식일자"
        mode="single"
      >
        <BaseDateInput ref={inputRef} onChange={handleDateChange} />
      </Field>
      <Field
        description="예식시간을 선택해주세요."
        label="예식시간"
        mode="group"
      >
        <BaseSelect
          options={HOUR_OPTION_LIST}
          value={hour}
          onChange={handleChangeHour}
        />
        <BaseSelect
          options={MINUTE_OPTION_LIST}
          value={minute}
          onChange={handleChangeMinute}
        />
      </Field>
    </>
  );
};

export default DateCalendarAdmin;
