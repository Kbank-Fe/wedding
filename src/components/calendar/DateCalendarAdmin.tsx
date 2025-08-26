import BaseDateInput from '@/components/shared/BaseDateInput';
import BaseSelect from '@/components/shared/BaseSelect';
import Group from '@/components/shared/Group';
import Input from '@/components/shared/Input';
import { useWeddingStore } from '@/stores/useWeddingStore';

const DateCalendarAdmin = () => {
  const store = useWeddingStore.getState();

  const hour = useWeddingStore((state) => state.values.date.hour);
  const min = useWeddingStore((state) => state.values.date.min);

  const hourOptionList = [
    { title: '오전 7시', value: 7 },
    { title: '오전 8시', value: 8 },
    { title: '오후 9시', value: 9 },
    { title: '오전 10시', value: 10 },
    { title: '오전 11시', value: 11 },
    { title: '낮 12시', value: 12 },
    { title: '오후 1시', value: 13 },
    { title: '오후 2시', value: 14 },
    { title: '오후 3시', value: 15 },
    { title: '오후 4시', value: 16 },
    { title: '오후 5시', value: 17 },
    { title: '오후 6시', value: 18 },
    { title: '오후 7시', value: 19 },
    { title: '오후 8시', value: 20 },
    { title: '오후 9시', value: 21 },
    { title: '오후 10시', value: 22 },
    { title: '오후 11시', value: 23 },
  ];

  const minOptionList = [
    { title: '정각', value: 0 },
    { title: '5분', value: 5 },
    { title: '10분', value: 10 },
    { title: '15분', value: 15 },
    { title: '20분', value: 20 },
    { title: '25분', value: 25 },
    { title: '30분', value: 30 },
    { title: '35분', value: 35 },
    { title: '40분', value: 40 },
    { title: '45분', value: 45 },
    { title: '50분', value: 50 },
    { title: '55분', value: 55 },
  ];

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    store.setField('date', 'year', date.getFullYear());
    store.setField('date', 'month', date.getMonth() + 1);
    store.setField('date', 'day', date.getDate());
  };

  const handleHourChange = (value: number) => {
    store.setField('date', 'hour', value);
  };

  const handleMinChange = (value: number) => {
    store.setField('date', 'min', value);
  };

  return (
    <>
      <Input labelText="예식일자">
        <BaseDateInput onChange={handleDateChange} />
      </Input>
      <Group labelText="예식시간">
        <BaseSelect
          options={hourOptionList}
          value={hour}
          onChange={(e) => handleHourChange(Number(e.target.value))}
        />
        <BaseSelect
          options={minOptionList}
          value={min}
          onChange={(e) => handleMinChange(Number(e.target.value))}
        />
      </Group>
    </>
  );
};

export default DateCalendarAdmin;
