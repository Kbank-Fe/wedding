import 'react-calendar/dist/Calendar.css';

import { css } from '@emotion/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Calendar from 'react-calendar';
import type { View } from 'react-calendar/dist/shared/types.js';

import DtimeItem from '@/components/calendar/DtimeItem';
import Header from '@/components/shared/Header';
import Line from '@/components/shared/Line';
import { MotionFade } from '@/components/shared/MotionFade';
import { useWeddingStore } from '@/stores/useWeddingStore';
import { getDayOfWeek, getDday, getDtime } from '@/utils/date';

type highlight = {
  date: Date;
  view: View;
};

const DateCalendar = () => {
  const date = useWeddingStore((state) => state.values.date);

  const { year, month, day, hour, min } = date;

  // Date 객체 생성 시 useMemo 사용: year, month, day, hour, min 값이 바뀔 때만 새로운 Date 객체 생성
  const dateObject = useMemo(() => {
    return new Date(year, month - 1, day, hour, min);
  }, [year, month, day, hour, min]);

  // react-calendar tileClassName 속성 전달: highlight 설정
  const setTileClassName = ({ date, view }: highlight) => {
    const classes: string[] = [];

    // 1. 특정 날짜 강조
    if (
      view === 'month' &&
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    ) {
      classes.push('highlight');
    }

    // 2. 일요일은 빨간색
    if (date.getDay() === 0) {
      classes.push('sunday');
    }

    return classes.join(' ');
  };

  // 요일 계산
  const dayOfWeek = getDayOfWeek(dateObject);

  // D-Day 계산
  const dDayRaw = getDday(dateObject);

  const dDay = Math.abs(dDayRaw);
  let dDayMessage = '';

  if (dDayRaw === 0) {
    dDayMessage = '🎉 오늘은 결혼식 날입니다!';
  } else if (dDayRaw < 0) {
    dDayMessage = `결혼식이 ${dDay}일 지났습니다.`;
  } else {
    dDayMessage = `결혼식까지 D-${dDay}일 남았습니다.`;
  }

  // D-Time 계산 (useCallback: 컴포넌트 리렌더될 때마다 새로운 함수 객체 생성 방지)
  const calculateDtime = useCallback(() => {
    return getDtime(dateObject);
  }, [dateObject]); // 최초 1회만 생성

  const [dtime, setDtime] = useState(calculateDtime());

  useEffect(() => {
    const timer = setInterval(() => {
      setDtime(calculateDtime());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateDtime]);

  const isDtimeShow = useMemo(() => {
    return (
      dDayRaw >= 0 && (dtime.d > 0 || dtime.h > 0 || dtime.m > 0 || dtime.s > 0)
    );
  }, [dDayRaw, dtime]);

  return (
    <>
      <Header title="Calendar" />
      <MotionFade css={dateStyle}>
        {`${year}년 ${month}월 ${day}일 | ${dayOfWeek}요일 ${hour}시 ${min !== 0 ? ` ${min}분` : '정각'}`}
      </MotionFade>
      <MotionFade css={calendarContainerStyle}>
        <Line />
        <Calendar
          activeStartDate={dateObject}
          calendarType="gregory"
          css={calendarStyle}
          formatDay={(_locale, date) => `${date.getDate()}`}
          minDetail="month" // 일/주/년 보기 제거
          showNavigation={false} // 상단 타이틀 및 화살표 전부 안보이게
          showNeighboringMonth={false}
          tileClassName={setTileClassName}
          view="month"
        />
      </MotionFade>
      <MotionFade css={dtimeStyle}>
        <Line marginBottom={30} marginTop={0} />
        {isDtimeShow && (
          <div css={dtimeRowStyle}>
            <DtimeItem dtimeNumber={dtime.d} dtimeText="일" />
            <DtimeItem dtimeNumber={dtime.h} dtimeText="시" />
            <DtimeItem dtimeNumber={dtime.m} dtimeText="분" />
            <DtimeItem dtimeNumber={dtime.s} dtimeText="초" />
          </div>
        )}
        <div>{dDayMessage}</div>
      </MotionFade>
    </>
  );
};

/* 달력 테두리 제거 */
const calendarContainerStyle = css`
  .react-calendar {
    border: none;
    box-shadow: none;
  }
`;

const calendarStyle = css`
  margin: 0 auto;
  padding-bottom: 10px;
  width: 100%; // 부모 요소 너비에 맞춤
  max-width: 100%; // 요소 최대 너비 부모 맞춤
  box-sizing: border-box; // 패딩, 보더 포함 요소 전체 너비와 높이 계산

  /* 기본 텍스트 색상: 검정 */
  .react-calendar__tile {
    color: var(--gray12) !important;
  }

  /* highlight 날짜 셀 스타일 설정 */
  .react-calendar__tile.highlight {
    background: var(--gray10) !important;
    color: var(--gray1) !important;
    border-radius: 90% !important;
  }

  /* sunday 날짜 셀에서 일요일은 빨간색 */
  .react-calendar__tile.sunday {
    color: var(--red9) !important;
  }

  /* 요일 헤더에서 일요일만 빨간색 */
  .react-calendar__month-view__weekdays__weekday:first-of-type {
    color: var(--red9) !important;
  }

  /* 날짜 클릭 방지 */
  .react-calendar__tile {
    pointer-events: none;
  }

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
  }

  /* 오늘 날짜 셀 하이라이트 제거 */
  .react-calendar__tile--now {
    background: none !important;
    color: inherit !important;
  }
`;

const dateStyle = css`
  margin: 0 auto;
  text-align: center; // 가운데 정렬
`;

const dtimeStyle = css`
  margin: 0 auto;
  text-align: center; // 가운데 정렬
  width: 100%;
`;

// 스타일 추가
const dtimeRowStyle = css`
  display: flex;
  justify-content: center;
  gap: 1rem; // 간격 조정
  margin: 0 0.8rem 1.5rem 0.8rem;
`;

export default DateCalendar;
