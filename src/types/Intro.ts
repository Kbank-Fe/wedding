export type Intro = {
  title: string;
  content: string;
  showNames: boolean;
  alignment: 'left' | 'center' | 'right';
  maleName?: string;
  femaleName?: string;
  maleFatherName?: string;
  maleMotherName?: string;
  femaleFatherName?: string;
  femaleMotherName?: string;
};
