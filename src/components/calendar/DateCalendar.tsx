import 'react-calendar/dist/Calendar.css';

import { css } from '@emotion/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Calendar from 'react-calendar';
import type { View } from 'react-calendar/dist/shared/types.js';

import Header from '@/components/shared/Header';
import { MotionFadeDown } from '@/components/shared/MotionFadeDown';
import { getDayOfWeek, getDday, getDtime } from '@/utils/date';

// TODO: types 디렉토리 이동
type DateInfo = {
  year: number;
  month: number;
  day: number;
  hour: number;
  min: number;
  sec?: number;
  msec?: number;
};

type Highlight = {
  date: Date;
  view: View;
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

const DateCalendar = (dateInfo: DateInfo) => {
  const { year, month, day, hour, min } = dateInfo;

  // react-calendar tileClassName 속성 전달: highlight 설정
  const setHighlight = ({ date, view }: Highlight) => {
    if (
      view === 'month' &&
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    ) {
      return 'highlight';
    }
    return '';
  };

  // 한국어 여부
  const korean = true;

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
    <>
      <Header title="Calendar" />
      <MotionFadeDown css={commonStyle}>
        <div>{`${year}년 ${month}월 ${day}일`}</div>
        <div>
          {`${dayOfWeek}${korean ? '요일 ' : 'DAY '} ${hour}시 ${min}분`}
        </div>
      </MotionFadeDown>
      <MotionFadeDown css={calendarStyle}>
        <Calendar
          activeStartDate={getDateObject(dateInfo)}
          calendarType="gregory"
          css={calendarStyle}
          formatDay={(locale, date) => `${date.getDate()}`}
          minDetail="month" // 일/주/년 보기 제거
          showNavigation={false} // 상단 타이틀 및 화살표 전부 안보이게
          showNeighboringMonth={false}
          tileClassName={setHighlight}
          view="month"
        />
      </MotionFadeDown>
      <MotionFadeDown css={commonStyle}>
        <div>{`${dtime.d}시 ${dtime.m} 분 ${dtime.s}초`}</div>
        <div>결혼식이 {dDay} 일 남았습니다.</div>
      </MotionFadeDown>
    </>
  );
};

const calendarStyle = css`
  margin: 0 auto;
  padding-bottom: 10px;

  /* hover 색상 변화 제거 */
  .react-calendar__tile,
  .react-calendar__tile:enabled:hover {
    background: none;
    /* color: inherit; */
    box-shadow: none;
    outline: none;
  }

  /* click, focus 색상 변화 제거 */
  .react-calendar__tile:focus,
  .react-calendar__tile:active,
  .react-calendar__tile--active {
    background: none !important;
    color: inherit !important;
    box-shadow: none !important;
    outline: none !important;
  }

  /* highlight 날짜 색상 설정 */
  .react-calendar__tile.highlight {
    background: var(--gray11) !important;
    color: white !important;
    border-radius: 90% !important;
  }
`;

const commonStyle = css`
  margin: 0 auto;
  padding-bottom: 20px;
  text-align: center; // 가운데 정렬
`;

export default DateCalendar;
