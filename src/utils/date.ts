import { HOUR_OPTION_LIST, MINUTE_OPTION_LIST } from './constants/time';

// 요일 반환
export const getDayOfWeek = (targetDate: Date) => {
  const getDayOfWeekList = ['일', '월', '화', '수', '목', '금', '토'];
  const day = targetDate.getDay();
  return getDayOfWeekList[day];
};

// D-Day 일자 계산
export const getDday = (targetDate: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

// D-Time 남은 일시 계산
export const getDtime = (targetDate: Date) => {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    return { d: 0, h: 0, m: 0, s: 0 };
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  return { d, h, m, s };
};

// 시간 값에 해당하는 제목 반환
export const getHourTitle = (hour: number) => {
  return HOUR_OPTION_LIST.filter((option) => option.value === hour)[0].title;
};

// 시간 값에 해당하는 제목 반환
export const getMinuteTitle = (minute: number) => {
  return MINUTE_OPTION_LIST.filter((option) => option.value === minute)[0]
    .title;
};
