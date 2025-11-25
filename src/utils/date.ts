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
  const hourOption = HOUR_OPTION_LIST.find((option) => option.value === hour);

  // 일치하는 값이 없을 경우 예외처리
  if (!hourOption) {
    return '';
  }

  return hourOption.title;
};

// 시간 값에 해당하는 제목 반환
export const getMinuteTitle = (minute: number) => {
  if (minute === 0) {
    return '';
  }

  const minuteOption = MINUTE_OPTION_LIST.find(
    (option) => option.value === minute,
  );

  // 일치하는 값이 없을 경우 예외처리
  if (!minuteOption) {
    return '';
  }

  return minuteOption.title;
};

/**
월(1~12)을 입력받아 영문 월 이름 반환
@param month 1~12 숫자
@returns 영어 월명 (ex: January)
*/
export const getEnglishMonth = (month: number) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // 1~12 아니라면 빈 문자열 반환
  if (!month || month < 1 || month > 12) return '';

  return monthNames[month - 1];
};
