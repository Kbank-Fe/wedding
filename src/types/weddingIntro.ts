export type Intro = {
  title: string;
  content: string;
  showNames: boolean;
  alignment: TextAlignment;
  basicInfo: UserBasicInfo[];
};

export type UserBasicInfo = {
  maleName?: string;
  femaleName?: string;
  maleFatherName?: string;
  maleMotherName?: string;
  femaleFatherName?: string;
  femaleMotherName?: string;
};

export type TextAlignment = 'left' | 'center' | 'right';
