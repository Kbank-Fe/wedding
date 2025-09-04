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
