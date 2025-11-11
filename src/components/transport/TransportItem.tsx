import { css } from '@emotion/react';
import DOMPurify from 'dompurify';
import { motion } from 'framer-motion';
import { IoCaretForwardOutline } from 'react-icons/io5';

type TransportProps = {
  title?: string;
  description?: string;
};

const TransportItem = ({ title, description }: TransportProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ amount: 0.2 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {title && (
        <div css={titleContainerStyle}>
          <IoCaretForwardOutline color="#87BBBA" size={14} />
          <h2 css={titleStyle}>{title}</h2>
        </div>
      )}
      {description && (
        <div
          css={descriptionStyle}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(description, { ADD_TAGS: ['br'] }),
          }}
        />
      )}
    </motion.div>
  );
};

const titleContainerStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  svg {
    flex-shrink: 0;
  }
`;

const titleStyle = css`
  color: var(--gray11);
  font-size: 14px;
  font-weight: 700;
  margin-left: 0.4rem;
`;

const descriptionStyle = css`
  color: var(--gray10);
  font-size: 13px;
  font-weight: 400;
  line-height: 1.6rem;
`;

export default TransportItem;
