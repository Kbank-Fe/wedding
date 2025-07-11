import { css } from '@emotion/react';

import Header from '@/components/Header';
import TransferItem from '@/components/transfer/TransferItem';

const tempList = [
  {
    title: '자가용 이용 시',
    description: (
      <p>
        내비게이션에 <strong>“서울특별시 강남구 test 테헤란로 123”</strong>을
        입력해 주세요. <br />
        주차는 지하 2층 전용 주차장을 이용하실 수 있으며,{' '}
        <em>2시간 무료 주차</em>가 제공됩니다.
      </p>
    ),
  },
  {
    title: '대중교통-셔틀버스 이용 시',
    description: (
      <p>
        2호선 삼성역 4번 출구에서 도보로 <strong>5분 거리</strong>에 셔틀버스
        정류장이 있습니다. <br />
        <em>매시 10분 간격</em>으로 운행되며, 배차 시간은 교통 상황에 따라
        변동될 수 있습니다.
      </p>
    ),
  },
  {
    title: '택시 이용 시',
    description: (
      <p>
        <strong>“서울특별시 강남구 테헤란로 123”</strong>이라고 기사님께 말씀해
        주세요. <br />
        정문 앞에 하차 공간이 마련되어 있어, <em>안전하게 승하차</em>가
        가능합니다.
      </p>
    ),
  },
];

const TransferList = () => {
  return (
    <>
      <Header title="Transportation" />
      <div css={groupStyle}>
        {tempList.map((info, index) => (
          <TransferItem key={index} {...info} />
        ))}
      </div>
    </>
  );
};

const groupStyle = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default TransferList;
