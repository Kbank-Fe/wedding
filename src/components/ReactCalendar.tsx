import 'react-calendar/dist/Calendar.css';

import styled from '@emotion/styled';
import { useState } from 'react';
import type { CalendarProps } from 'react-calendar';
import Calendar from 'react-calendar';

type DateType = CalendarProps['value']; // Date | Date[] | null,

const ReactCalendar = () => {
  const [value, setValue] = useState<DateType>(new Date());

  const handleDateChange: CalendarProps['onChange'] = (val) => {
    setValue(val);
  };

  return (
    <div>
      <Container>
        <Calendar
          locale="ko-KR"
          next2Label={null}
          nextLabel={null}
          prev2Label={null}
          prevLabel={null}
          value={value}
          onChange={handleDateChange}
        />
        <p>선택한 날짜: {value instanceof Date ? value.toDateString() : ''}</p>
      </Container>
    </div>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 320px;
  margin: 0 auto; /* 수평 가운데 정렬 */
  padding: 2rem; /* 좌우 여백 */
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default ReactCalendar;
