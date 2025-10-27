import { toast } from 'sonner';

type Copy = {
  text: string;
};

export const copyToClipboard = async ({ text }: Copy) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success('계좌번호를 복사했어요.');
  } catch {
    toast.error('복사 중 문제가 발생했어요. 다시 시도해 주세요.');
  }
};

export const copyToLink = async ({ text }: Copy) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success('링크를 복사했어요.');
  } catch {
    toast.error('복사 중 문제가 발생했어요. 다시 시도해 주세요.');
  }
};
