import 'react-calendar/dist/Calendar.css';

import { css } from '@emotion/react';
import { useMemo } from 'react';
import Calendar from 'react-calendar';
import type { View } from 'react-calendar/dist/shared/types.js';

import Header from '@/components/shared/Header';
import { MotionFade } from '@/components/shared/MotionFade';
import { useWeddingStore } from '@/stores/useWeddingStore';
import {
  getDayOfWeek,
  getDday,
  getHourTitle,
  getMinuteTitle,
} from '@/utils/date';

import Line from '../shared/Line';

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

    // 특정 날짜 강조
    if (
      view === 'month' &&
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    ) {
      classes.push('highlight');
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
    dDayMessage = '🎉 오늘은 결혼식 날이에요!';
  } else if (dDayRaw < 0) {
    dDayMessage = `결혼식이 ${dDay}일 지났어요`;
  } else {
    dDayMessage = `결혼식까지 ${dDay}일 남았어요`;
  }

  return (
    <>
      <Header title="Calendar" />
      <MotionFade css={dateStyle}>
        <div
          css={dateTimeStyle}
        >{`${year}년 ${month}월 ${day}일 ${dayOfWeek}요일`}</div>
        <div
          css={dateTimeStyle}
        >{`${getHourTitle(hour)} ${getMinuteTitle(min)}`}</div>
        <hr css={lineStyle} />
        <div css={monthStyle}>{month}</div>
      </MotionFade>
      <MotionFade>
        {/* <Line /> */}
        <div css={calendarContainerStyle}>
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
            formatShortWeekday={(_locale, date) =>
              ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]
            }
          />
        </div>
        {/* <Line /> */}
        <div css={dtimeStyle}>{dDayMessage}</div>
      </MotionFade>
    </>
  );
};

/* 달력 테두리 제거 */
const calendarContainerStyle = css`
  .react-calendar {
    background-color: #f8f6f1;
    border: none;
    box-shadow: none;
  }

  border-top: 0.1px solid var(--gray3);
  border-bottom: 0.1px solid var(--gray3);
  padding: 1rem 0 0.5rem 0;
`;

const calendarStyle = css`
  margin: 0 auto;
  padding-bottom: 10px;
  width: 100%; // 부모 요소 너비에 맞춤
  max-width: 100%; // 요소 최대 너비 부모 맞춤
  box-sizing: border-box; // 패딩, 보더 포함 요소 전체 너비와 높이 계산

  /* 기본 텍스트 색상: 검정 */
  .react-calendar__tile {
    color: var(--gray11) !important;
    font-weight: 100;
  }

  /* highlight 날짜 셀 스타일 설정 */
  .react-calendar__tile.highlight {
    background: #87bbba !important;
    color: var(--gray1) !important;
    border-radius: 80% !important;
  }

  /* 요일 헤더에서 일요일만 빨간색 */
  .react-calendar__month-view__weekdays__weekday {
    font-weight: 200;
    color: var(--gray7);
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
  margin: 0 auto 2rem auto;
  text-align: center;
`;

const dateTimeStyle = css`
  color: var(--gray11);
  font-size: 13px;
`;

const lineStyle = css`
  width: 15%;
  margin: 1.5rem auto 2rem auto;
  border-bottom: 1px solid #87bbba;
`;

const monthStyle = css`
  color: var(--gray11);
  font-size: 36px;
`;

const dtimeStyle = css`
  color: var(--gray11);
  font-size: 13px;
  margin: 2rem auto 0 auto;
  text-align: center;
`;

export default DateCalendar;
