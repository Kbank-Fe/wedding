// 요일 반환
export const getDayOfWeek = (targetDate: Date, korean: boolean = true) => {
  const getDayOfWeekList = [
    {
      kor: '일',
      eng: 'SUN',
    },
    {
      kor: '월',
      eng: 'MON',
    },
    {
      kor: '화',
      eng: 'TUES',
    },
    {
      kor: '수',
      eng: 'WEDNES',
    },
    {
      kor: '목',
      eng: 'THURS',
    },
    {
      kor: '금',
      eng: 'FRI',
    },
    {
      kor: '토',
      eng: 'SUN',
    },
  ];
  const day = targetDate.getDay();
  return korean ? getDayOfWeekList[day].kor : getDayOfWeekList[day].eng;
};
