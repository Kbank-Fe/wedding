import 'react-calendar/dist/Calendar.css';
import '@styles/ReactCalendar.css';

import { css } from '@emotion/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Calendar from 'react-calendar';
import type { View } from 'react-calendar/dist/shared/types.js';

import { getDayOfWeek, getDday, getDtime } from '@/utils/date';

// TODO: types 디렉토리 이동
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
// TODO: types 디렉토리 이동
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
    day: 14,
    hour: 13,
    min: 20,
    sec: 0,
    msec: 0,
  };

  // react-calendar tileClassName 속성 전달: highlight 설정
  const setHighlight = ({ date, view }: { date: Date; view: View }) => {
    if (
      view === 'month' &&
      date.getFullYear() === dateInfo.year &&
      date.getMonth() === dateInfo.month - 1 &&
      date.getDate() === dateInfo.day
    ) {
      return 'highlight';
    }
    return '';
  };

  // 한국어 여부
  const korean = false;

  // 요일 계산
  const dayOfWeek = useMemo(() => {
    const weddingDate = getDateObject(dateInfo);
    return getDayOfWeek(weddingDate, korean);
  }, [dateInfo, korean]);

  // D-Day 일자 계산
  const dDay = useMemo(() => {
    const weddingDate = getDateObject(dateInfo);
    return getDday(weddingDate);
  }, [dateInfo]);

  // D-Time 계산 (useCallback: 컴포넌트 리렌더될 때마다 새로운 함수 객체 생성 방지)
  const calculateDtime = useCallback(() => {
    const weddingDate = getDateObject(dateInfo);
    return getDtime(weddingDate);
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
      <div css={dateHeader}>
        {dateInfo.year + '년 ' + dateInfo.month + '월 ' + dateInfo.day + '일'}
      </div>
      <div css={timeHeader}>
        {dayOfWeek +
          (korean ? '요일 ' : 'DAY ') +
          dateInfo.hour +
          '시 ' +
          dateInfo.min +
          '분'}
      </div>
      <Calendar
        activeStartDate={getDateObject(dateInfo)}
        calendarType="gregory"
        formatDay={(locale, date) => `${date.getDate()}`}
        minDetail="month" // 일/주/년 보기 제거
        showNavigation={false} // 상단 타이틀 및 화살표 전부 안보이게
        showNeighboringMonth={false}
        tileClassName={setHighlight}
        view="month"
      />
      <div css={ddayDiv}>
        {dtime.d} 일 {dtime.h} 시 {dtime.m} 분 {dtime.s} 초
      </div>
      <div css={ddayDiv}>결혼식이 {dDay} 일 남았습니다.</div>
    </div>
  );
};

const dateHeader = css`
  margin: 0 auto; /* 수평 가운데 정렬 */
`;

const timeHeader = css`
  margin: 0 auto; /* 수평 가운데 정렬 */
`;

const ddayDiv = css`
  margin: 0 auto; /* 수평 가운데 정렬 */
`;

export default ReactCalendar;
