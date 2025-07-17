import { toast } from 'sonner';

type Copy = {
  text: string;
};

export const copyToClipboard = async ({ text }: Copy) => {
  try {
    await navigator.clipboard.writeText(text);
    toast('계좌번호 복사에 성공했어요.');
  } catch {
    toast.error('계좌번호 복사에 실패했어요.');
  }
};
