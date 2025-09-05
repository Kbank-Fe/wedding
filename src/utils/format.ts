// phone 번호 포맷 함수
export const formatPhone = (value: string) => {
  const numbers = value.replace(/\D/g, ''); // 숫자만 추출

  // 010-1234-5678 형태 포맷
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
};
