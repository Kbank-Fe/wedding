import { css } from '@emotion/react';

import type { Intro } from '@/types/Intro';
import type { TextAlignment } from '@/types/TextAlignment';

const Intro = () => {
  const weddingIntroData: Intro = {
    title: '저희 결혼합니다',
    content: `
      <div id="intro-ment-area">
        <p>100년 동안 당신을 모르고 사는 것보다,</p>
        <p>당신을 알고 지금 죽는 게 더 나아요.</p>
        <p>&nbsp;</p>
        <p>- 디즈니, &lt;포카혼타스&gt; 中 -</p>
        <p>-</p>
        <p>평생 서로 귀하게 여기며<br>첫 마음 그대로 존중하고&nbsp;</p>
        <p>배려하며 살겠습니다.<br><br>오로지 믿음과 사랑을 약속하는 날<br>오셔서 축복해 주시면 더 없는 기쁨으로<br>간직하겠습니다.</p>
      </div>
    `,
    showNames: true,
    alignment: 'center' as const,
    maleName: 'MMM',
    femaleName: 'FFF',
    maleFatherName: '신랑아버지',
    maleMotherName: '신랑어머니',
    femaleFatherName: '신부아버지',
    femaleMotherName: '신부어머니',
  };

  const maleNames = `${weddingIntroData.maleFatherName} · ${weddingIntroData.maleMotherName}의 아들 ${weddingIntroData.maleName}`;
  const femaleNames = `${weddingIntroData.femaleFatherName} · ${weddingIntroData.femaleMotherName}의 딸 ${weddingIntroData.femaleName}`;

  return (
    <div css={introContainerStyle}>
      <p css={titleStyle}>{weddingIntroData.title}</p>
      <div dangerouslySetInnerHTML={{ __html: weddingIntroData.content }} />
      <br />
      {weddingIntroData.showNames && (
        <p css={namesStyle(weddingIntroData.alignment)}>
          {maleNames} <br /> {femaleNames}
        </p>
      )}
    </div>
  );
};

const introContainerStyle = css`
  padding: 24px;
  border-radius: 12px;
  text-align: center;
`;

const titleStyle = css`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const namesStyle = (alignment: TextAlignment) => css`
  text-align: ${alignment};
  font-size: 13px;
  line-height: 1.5;
`;

export default Intro;
