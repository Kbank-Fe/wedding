export const HOUR_OPTION_LIST = [
  { title: '오전 7시', value: 7 },
  { title: '오전 8시', value: 8 },
  { title: '오후 9시', value: 9 },
  { title: '오전 10시', value: 10 },
  { title: '오전 11시', value: 11 },
  { title: '낮 12시', value: 12 },
  { title: '오후 1시', value: 13 },
  { title: '오후 2시', value: 14 },
  { title: '오후 3시', value: 15 },
  { title: '오후 4시', value: 16 },
  { title: '오후 5시', value: 17 },
  { title: '오후 6시', value: 18 },
  { title: '오후 7시', value: 19 },
  { title: '오후 8시', value: 20 },
  { title: '오후 9시', value: 21 },
  { title: '오후 10시', value: 22 },
  { title: '오후 11시', value: 23 },
];

export const MINUTE_OPTION_LIST = [
  { title: '0분', value: 0 },
  { title: '5분', value: 5 },
  { title: '10분', value: 10 },
  { title: '15분', value: 15 },
  { title: '20분', value: 20 },
  { title: '25분', value: 25 },
  { title: '30분', value: 30 },
  { title: '35분', value: 35 },
  { title: '40분', value: 40 },
  { title: '45분', value: 45 },
  { title: '50분', value: 50 },
  { title: '55분', value: 55 },
];

/**
 * 시(hour), 분(minute) 숫자를 입력받아 "AM/PM hh" 형태로 반환
 * @param hour 0~23
 * @param minute 0~59
 * @returns 예: "AM 07:05", "PM 12:30"
 */
export const formatToAmPm = (hour: number, minute: number) => {
  const period = hour < 12 ? 'AM' : 'PM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  const displayMinute = minute.toString().padStart(2, '0');

  return `${period} ${displayHour.toString().padStart(2, '0')}:${displayMinute}`;
};
