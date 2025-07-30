import 'react-calendar/dist/Calendar.css';

import { css } from '@emotion/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Calendar from 'react-calendar';
import type { View } from 'react-calendar/dist/shared/types.js';

import Header from '@/components/shared/Header';
import { MotionFade } from '@/components/shared/MotionFade';
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
      <MotionFade css={commonStyle}>
        <div>{`${year}년 ${month}월 ${day}일 | ${dayOfWeek}${korean ? '요일 ' : 'DAY '} ${hour}시 ${min}분`}</div>
        <div>{``}</div>
      </MotionFade>
      <MotionFade>
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
      </MotionFade>
      <MotionFade css={commonStyle}>
        <div css={dtimeRowStyle}>
          <div css={dtimeBoxStyle}>
            <span css={dtimeValueStyle}>{dtime.d}</span>
            <span css={dtimeLabelStyle}>일</span>
          </div>
          <div css={dtimeBoxStyle}>
            <span css={dtimeValueStyle}>{dtime.h}</span>
            <span css={dtimeLabelStyle}>시</span>
          </div>
          <div css={dtimeBoxStyle}>
            <span css={dtimeValueStyle}>{dtime.m}</span>
            <span css={dtimeLabelStyle}>분</span>
          </div>
          <div css={dtimeBoxStyle}>
            <span css={dtimeValueStyle}>{dtime.s}</span>
            <span css={dtimeLabelStyle}>초</span>
          </div>
        </div>
        <div>결혼식이 {dDay} 일 남았습니다.</div>
      </MotionFade>
    </>
  );
};

const calendarStyle = css`
  margin: 0 auto;
  padding-bottom: 10px;
  width: 100%; // 부모 요소 너비에 맞춤
  max-width: 100%; // 요소 최대 너비 부모 맞춤
  box-sizing: border-box; // 패딩, 보더 포함 요소 전체 너비와 높이 계산

  /* hover 색상 변화 제거 */
  .react-calendar__tile,
  .react-calendar__tile:enabled:hover {
    background: none;
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

// 스타일 추가
const dtimeRowStyle = css`
  display: flex;
  justify-content: center;
  gap: 1rem; // 간격 조정
  margin: 1.5rem 0.8rem 1.5rem 0.8rem;
`;

const dtimeBoxStyle = css`
  background: var(--gray1);
  border-radius: 12px;
  min-width: 56px;
  min-height: 64px;
  padding: 10px 12px; // ← 여백 추가
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 3px 3px 12px 0 var(--gray8);
  position: relative;
`;

const dtimeValueStyle = css`
  font-size: 1.2rem;
  color: var(--gray12);
`;

const dtimeLabelStyle = css`
  font-size: 0.8rem;
  color: var(--gray9);
  margin-top: 2px;
`;

export default DateCalendar;
