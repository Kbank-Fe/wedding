import type { WeddingInfo } from '@/types/wedding';

const validateNum = (v: string): boolean => /^[0-9]*$/.test(v);
const validateKor = (v: string): boolean => /^[ㄱ-ㅎㅏ-ㅣ가-힣 ]*$/.test(v);
const validateUrl = (v: string): boolean => /^[A-Za-z0-9:/.\-_?&=]*$/.test(v);
const validateTxt = (v: string): boolean =>
  /^[0-9A-Za-zㄱ-ㅎㅏ-ㅣ가-힣\s]*$/.test(v);
const validateAll = (v: string): boolean =>
  /^[0-9A-Za-zㄱ-ㅎㅏ-ㅣ가-힣\s.,!?~"'()\-:;]*$/.test(v);

const validators: Record<string, (v: string) => boolean> = {
  num: validateNum,
  kor: validateKor,
  url: validateUrl,
  txt: validateTxt,
  all: validateAll,
};

export const isValid = (value: string, type: string): boolean => {
  return validators[type]?.(value) ?? false;
};

export const validateWeddingInfo = (v: WeddingInfo) => {
  const CHECKS = [
    {
      valid: Boolean(v.basicInfo.maleName?.trim()),
      label: '신랑 이름을',
    },
    {
      valid: Boolean(v.basicInfo.femaleName?.trim()),
      label: '신부 이름을',
    },
    {
      valid: Boolean(v.date.year && v.date.year > 0),
      label: '결혼식 연도를',
    },
    {
      valid: Boolean(v.date.month && v.date.month > 0),
      label: '결혼식 월을',
    },
    {
      valid: Boolean(v.location.venueName?.trim()),
      label: '예식장명을',
    },
    {
      valid: Boolean(v.location.address?.trim()),
      label: '주소를',
    },
  ] as const;

  const invalidList = CHECKS.filter((c) => !c.valid);

  return {
    isValid: invalidList.length === 0,
    invalidLabels: invalidList.map((c) => c.label),
  };
};
