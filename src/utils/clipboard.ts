type Copy = {
  text: string;
};

export const copyToClipboard = async ({ text }: Copy) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log('복사 성공');
  } catch (err) {
    console.error('복사 실패:', err);
  }
};
