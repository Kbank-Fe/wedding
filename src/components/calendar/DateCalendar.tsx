import 'react-calendar/dist/Calendar.css';

import { css } from '@emotion/react';
import { useMemo } from 'react';
import Calendar from 'react-calendar';
import type { View } from 'react-calendar/dist/shared/types.js';
import { ImHeart } from 'react-icons/im';
import { TfiLayoutLineSolid } from 'react-icons/tfi';

import { MotionFade } from '@/components/shared/MotionFade';
import { useWeddingStore } from '@/stores/useWeddingStore';
import {
  getDayOfWeek,
  getDday,
  getHourTitle,
  getMinuteTitle,
} from '@/utils/date';

type highlight = {
  date: Date;
  view: View;
};

const DateCalendar = () => {
  const date = useWeddingStore((state) => state.values.date);
  const basicInfo = useWeddingStore((state) => state.values.intro.basicInfo);

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
  let dDayMessage;

  if (dDayRaw === 0) {
    dDayMessage = '🎉 오늘은 결혼식 날이에요!';
  } else if (dDayRaw < 0) {
    dDayMessage = (
      <>
        {basicInfo.maleName}
        <ImHeart color="#E0E0E0" css={heartIconStyle} size={11} />
        {basicInfo.femaleName} 행복한 결혼식을 마쳤습니다
      </>
    );
  } else {
    dDayMessage = (
      <>
        {basicInfo.maleName}
        <ImHeart color="#87BBBA" css={heartIconStyle} size={11} />
        {basicInfo.femaleName} 결혼식까지 <span css={dDayStyle}>{dDay}</span>일
        남았습니다
      </>
    );
  }

  return (
    <>
      <MotionFade css={dateStyle}>
        <div css={dateTimeStyle}>
          <p>{`${year}년 ${month}월 ${day}일 ${dayOfWeek}요일`}</p>
          <p>{`${getHourTitle(hour)} ${getMinuteTitle(min)}`}</p>
        </div>
        <TfiLayoutLineSolid color="#87bbba" size={24} strokeWidth={1} />
        <div css={monthStyle}>{month}</div>
      </MotionFade>
      <MotionFade>
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
    line-height: 1.4rem;
  }

  border-top: 0.5px solid var(--gray4);
  border-bottom: 0.5px solid var(--gray4);
  padding: 1.3rem 0.8rem;
`;

const calendarStyle = css`
  box-sizing: border-box; // 패딩, 보더 포함 요소 전체 너비와 높이 계산
  font-family: 'Wedding' !important;
  font-weight: 400 !important;

  /* 기본 텍스트 색상: 검정 */
  .react-calendar__tile {
    color: var(--gray11) !important;
  }

  /* highlight 날짜 셀 스타일 설정 */
  .react-calendar__tile.highlight {
    background: #87bbba !important;
    color: var(--gray1) !important;
    border-radius: 50% !important;
    font-weight: 700 !important;
  }

  /* 요일 헤더에서 일요일만 빨간색 */
  .react-calendar__month-view__weekdays__weekday {
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
  text-align: center;
`;

const dateTimeStyle = css`
  color: var(--gray11);
  font-size: 14px;
  margin-bottom: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const monthStyle = css`
  color: var(--gray11);
  font-size: 35px;
  margin: 2rem 0 2.7rem;
`;

const dtimeStyle = css`
  color: var(--gray10);
  font-size: 13px;
  margin-top: 2.2rem;
  text-align: center;
`;

const dDayStyle = css`
  color: var(--gray11);
  font-size: 13px;
  font-weight: 700;
`;

const heartIconStyle = css`
  margin: 0 0.3rem;
`;

export default DateCalendar;
