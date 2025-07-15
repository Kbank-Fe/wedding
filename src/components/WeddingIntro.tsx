import { css } from '@emotion/react';
import { animate, stagger } from 'motion';
import { splitText } from 'motion-plus';
import { useEffect, useRef } from 'react';

import type { Intro } from '@/types/Intro';
import type { TextAlignment } from '@/types/TextAlignment';

import Header from './Header';

const WeddingIntro = () => {
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

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    document.fonts.ready.then(() => {
      container.style.visibility = 'visible';

      // data-ani 속성 값에 따른 타입 매핑
      const typeMap = {
        char: 'chars',
        line: 'lines',
        words: 'words',
      } as const;

      Object.entries(typeMap).forEach(([key, splitType]) => {
        const elements = container.querySelectorAll(`[data-ani="${key}"]`);
        elements.forEach((el) => {
          const splitted = splitText(el as HTMLElement, { type: splitType });

          // 'chars', 'lines', 'words' 중에서 대상 배열 가져오기
          const targets = splitted[splitType];

          switch (splitType) {
            case 'chars':
              animate(
                targets,
                { opacity: [0, 1], y: [10, 0] },
                {
                  type: 'spring',
                  duration: 2,
                  bounce: 0,
                  delay: stagger(0.05),
                },
              );
              break;
            case 'words':
              animate(
                targets,
                { opacity: [0, 3], y: [10, 0] },
                {
                  type: 'spring',
                  duration: 1,
                  delay: stagger(0.07),
                  easing: 'ease-out',
                },
              );
              break;
            case 'lines':
              animate(
                targets,
                { opacity: [0, 1], y: [20, 0] },
                {
                  duration: 0.8,
                  delay: stagger(0.15),
                  easing: 'ease-out',
                },
              );
              break;
          }
        });
      });
    });
  }, []);

  return (
    <>
      <Header title={'Wedding Day~!'} />
      <div ref={containerRef} css={introContainerStyle}>
        <p css={titleStyle} data-ani="words">
          {weddingIntroData.title}
        </p>
        <div dangerouslySetInnerHTML={{ __html: weddingIntroData.content }} />
        <br />
        {weddingIntroData.showNames && (
          <p css={namesStyle(weddingIntroData.alignment)}>
            {maleNames} <br /> {femaleNames}
          </p>
        )}
      </div>
    </>
  );
};

const introContainerStyle = css`
  padding: 24px;
  border-radius: 12px;
  text-align: center;

  [data-split-char],
  [data-split-line],
  [data-split-words] {
    display: inline-block;
    white-space: pre;
  }
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

export default WeddingIntro;
