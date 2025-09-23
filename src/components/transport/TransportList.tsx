import { css } from '@emotion/react';

import Header from '@/components/shared/Header';
import TransportItem from '@/components/transport/TransportItem';
import { useWeddingStore } from '@/stores/useWeddingStore';

const TransportList = () => {
  const transportList = useWeddingStore(
    (state) => state.values.transport.transportList,
  );
  return (
    <>
      <Header title="Transportation" />
      <div css={groupStyle}>
        {transportList.map((info, index) => (
          <TransportItem key={index} {...info} />
        ))}
      </div>
    </>
  );
};

const groupStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export default TransportList;
