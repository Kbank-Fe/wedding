import { css } from '@emotion/react';
import { useMemo } from 'react';

import TransportItem from '@/components/transport/TransportItem';
import { useWeddingStore } from '@/stores/useWeddingStore';

const TransportList = () => {
  const transportList = useWeddingStore(
    (state) => state.values.transport.transportList,
  );

  const filteredTransportList = useMemo(() => {
    return transportList
      .map((item) => {
        const html = item.description.trim();
        const filteredDescription =
          /^(\s*<p>(?:\s|<br\s*\/?>)*<\/p>\s*)+$/i.test(html) ? '' : html;

        return {
          ...item,
          title: item.title.trim(),
          description: filteredDescription,
        };
      })
      .filter((item) => item.title !== '' || item.description !== '');
  }, [transportList]);

  return (
    <div css={groupStyle}>
      {filteredTransportList.map((info, index) => (
        <TransportItem key={index} {...info} />
      ))}
    </div>
  );
};

const groupStyle = css`
  display: flex;
  flex-direction: column;
  gap: 2.3rem;
  width: 100%;
  max-width: 100%;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
  box-sizing: border-box;
  word-break: keep-all;
`;

export default TransportList;
