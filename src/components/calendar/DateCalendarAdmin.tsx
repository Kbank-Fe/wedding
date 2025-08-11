import { useEffect, useState } from 'react';

import BaseDateInput from '@/components/shared/BaseDateInput';
import BaseSelect from '@/components/shared/BaseSelect';

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

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleTextChange = (text: string) => {
    setSelectedValue(text);
  };
  return (
    <>
      <BaseDateInput onChange={handleDateChange} />
      <br />
      <BaseSelect
        options={optionList}
        value={selectedValue}
        onChange={handleTextChange}
      />
    </>
  );
};

export default DateCalendarAdmin;
