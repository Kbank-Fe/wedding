import 'react-calendar/dist/Calendar.css';
import '../styles/ReactCalendar.css';

import styled from '@emotion/styled';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Calendar from 'react-calendar';

import { getDayOfWeek } from '@/utils/date';

type DateInfo = {
  year: number;
  month: number;
  day: number;
  hour: number;
  min: number;
  sec: number;
  msec: number;
};

// Date 객체 반환 (월 - 1)
const getDateObject = (dateInfo: DateInfo) =>
  new Date(
    dateInfo.year,
    dateInfo.month - 1,
    dateInfo.day,
    dateInfo.hour,
    dateInfo.min,
    dateInfo.sec,
    dateInfo.msec,
  );

const ReactCalendar = () => {
  // const [dateInfo, setDateInfo] = useState<DateInfo>();
  const dateInfo = {
    year: 2026,
    month: 6,
    day: 20,
    hour: 13,
    min: 20,
    sec: 0,
    msec: 0,
  };

  // 한국어 여부
  const korean = false;

  // 요일 계산
  const dayOfWeek = useMemo(() => {
    const weddingDate = getDateObject(dateInfo);
    return getDayOfWeek(weddingDate, korean);
  }, [dateInfo, korean]);

  // dDay 일자 계산
  const dDay = useMemo(() => {
    const weddingDate = getDateObject(dateInfo);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = weddingDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [dateInfo]);

  // dTime 계산 (useCallback: 컴포넌트 리렌더될 때마다 새로운 함수 객체 생성 방지)
  const calculateDtime = useCallback(() => {
    const now = new Date();
    const weddingDate = getDateObject(dateInfo);
    const diff = weddingDate.getTime() - now.getTime();

    if (diff <= 0) {
      return { d: 0, h: 0, m: 0, s: 0 };
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    return { d, h, m, s };
  }, [dateInfo]); // 최초 1회만 생성

  const [dtime, setDtime] = useState(calculateDtime());

  useEffect(() => {
    const timer = setInterval(() => {
      setDtime(calculateDtime());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateDtime]);

  return (
    <div>
      <Container>
        <DateHeader>
          {dateInfo.year + '년 ' + dateInfo.month + '월 ' + dateInfo.day + '일'}
        </DateHeader>
        <TimeHeader>
          {dayOfWeek +
            (korean ? '요일 ' : 'DAY ') +
            dateInfo.hour +
            '시 ' +
            dateInfo.min +
            '분'}
        </TimeHeader>
        <Calendar
          calendarType="gregory"
          formatDay={(locale, date) => `${date.getDate()}`}
          minDetail="month" // 일/주/년 보기 제거
          showNavigation={false} // 상단 타이틀 및 화살표 전부 안보이게
          showNeighboringMonth={false}
          view="month"
          activeStartDate={
            new Date(dateInfo.year, dateInfo.month - 1, dateInfo.day)
          }
          tileClassName={({ date, view }) => {
            if (
              view === 'month' &&
              date.getFullYear() === dateInfo.year &&
              date.getMonth() === dateInfo.month - 1 &&
              date.getDate() === dateInfo.day
            ) {
              return 'highlight';
            }
          }}
        />
        <DdayDiv>
          {dtime.d} 일 {dtime.h} 시 {dtime.m} 분 {dtime.s} 초
        </DdayDiv>
        <DdayDiv>결혼식이 {dDay} 일 남았습니다.</DdayDiv>
      </Container>
    </div>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto; /* 수평 가운데 정렬 */
  padding: 2rem; /* 좌우 여백 */
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DateHeader = styled.div`
  margin: 0 auto; /* 수평 가운데 정렬 */
`;

const TimeHeader = styled.div`
  margin: 0 auto; /* 수평 가운데 정렬 */
`;

const DdayDiv = styled.div`
  margin: 0 auto; /* 수평 가운데 정렬 */
`;

export default ReactCalendar;
