import { useEffect, useState } from 'react';

import BaseDateInput from '@/components/shared/BaseDateInput';
import BaseSelect from '@/components/shared/BaseSelect';
import Input from '@/components/shared/Input';

const DateCalendarAdmin = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');
  const optionList = [
    { title: '오전 10시', value: '10' },
    { title: '오전 11시', value: '11' },
    { title: '오후 12시', value: '12' },
    { title: '오후 1시', value: '13' },
    { title: '오후 2시', value: '14' },
  ];

  useEffect(() => {
    console.log('Selected date:', selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    console.log('Selected value:', selectedValue);
  }, [selectedValue]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleTextChange = (text: string) => {
    setSelectedValue(text);
  };
  return (
    <>
      <Input labelText="예식일자">
        <BaseDateInput onChange={handleDateChange} />
      </Input>
      <Input labelText="예식시간">
        <BaseSelect
          options={optionList}
          value={selectedValue}
          onChange={handleTextChange}
        />
      </Input>
    </>
  );
};

export default DateCalendarAdmin;
