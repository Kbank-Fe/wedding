import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type TypingTextProps = {
  text: string;
  delay?: number;
};

const TypingText = ({ text = '', delay = 0 }: TypingTextProps) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!text) return;
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        const char = text.charAt(i);
        if (char) {
          setDisplayed((prev) => prev + char);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 100);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [text, delay]);

  return (
    <motion.h1 css={typingTextStyle}>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity }}
      >
        |
      </motion.span>
    </motion.h1>
  );
};

const typingTextStyle = css`
  font-family: 'Instrument Serif', serif;
  font-size: 42px;
  letter-spacing: 0.05rem;
  margin-bottom: 0.5rem;
  color: var(--gray2);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
`;

export default TypingText;
