import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type ImageSlidesMotionProps = {
  images: string[];
  interval?: number;
  duration?: number;
  width?: string;
  height?: string;
  radius?: string;
};

const ImageSlideMotion = ({
  images,
  interval = 5000,
  duration = 1.5,
  width = '300px',
  height = '300px',
  radius = '0px',
}: ImageSlidesMotionProps) => {
  const [slide, setSlide] = useState({ index: 0, prev: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((s) => ({
        prev: s.index,
        index: (s.index + 1) % images.length,
      }));
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div css={wrapperStyle(width, height, radius)}>
      <img alt="prev" css={imageStyle(radius)} src={images[slide.prev]} />
      <motion.img
        key={slide.index}
        alt="current"
        animate={{ opacity: 1 }}
        css={imageStyle(radius)}
        initial={{ opacity: 0 }}
        src={images[slide.index]}
        transition={{ duration, ease: 'easeInOut' }}
      />
    </div>
  );
};

const wrapperStyle = (width: string, height: string, radius: string) => css`
  position: relative;
  width: ${width};
  height: ${height};
  overflow: hidden;
  border-radius: ${radius};
  margin: 0 auto;
`;

const imageStyle = (radius: string) => css`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translateZ(0);
  will-change: opacity;
  border-radius: ${radius};
`;

export default ImageSlideMotion;
