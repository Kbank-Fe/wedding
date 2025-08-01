export type Intro = {
  title: string;
  content: string;
  alignment: TextAlignment;
  basicInfo: UserBasicInfo[];
};

export type UserBasicInfo = {
  maleNames: string;
  femaleNames: string;
};

export type TextAlignment = 'left' | 'center' | 'right';
