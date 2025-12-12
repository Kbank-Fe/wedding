import { css } from '@emotion/react';

import ImageSlideMotion from '@/components/shared/motion/ImageSlideMotion';
import Sticker from '@/components/shared/Sticker';
import { useImagePreview } from '@/hooks/useImagePreview';
import { useWeddingStore } from '@/stores/useWeddingStore';

const RoundSlideTheme = () => {
  const { groomEnglishName, brideEnglishName, text1, text2 } = useWeddingStore(
    (state) => state.values.theme,
  );
  const { localImageList } = useWeddingStore(
    (state) => state.values.themeImage,
  );
  const imagePreviewList = useImagePreview(localImageList);

  return (
    <section css={containerStyle}>
      <header css={headerStyle}>
        <h1 css={titleStyle}>
          {text1} <br /> {text2}
        </h1>
        <Sticker right="-10px" size="38px" top="-10px" />
      </header>
      <figure css={figureStyle}>
        <ImageSlideMotion
          height="360px"
          images={imagePreviewList}
          radius="170px"
          width="300px"
        />
        <figcaption css={descriptionStyle}>
          {groomEnglishName} and {brideEnglishName}
        </figcaption>
      </figure>
    </section>
  );
};

const containerStyle = css`
  padding: 5rem 0;
  color: var(--gray11);
`;

const headerStyle = css`
  position: relative;
  margin: 0 3rem 1.5rem;
`;

const titleStyle = css`
  font-family: 'Instrument Serif', serif;
  font-size: 42px;
  text-transform: uppercase;
  margin-left: 0.5rem;
`;

const figureStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const descriptionStyle = css`
  font-family: 'Herr Von Muellerhoff', cursive;
  font-size: 20px;
  text-align: center;
  letter-spacing: 0.1rem;
  opacity: 0.8;
`;

export default RoundSlideTheme;
