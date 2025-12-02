import { css } from '@emotion/react';

type BaseRadioButtonScrollGroupProps = {
  items: BaseRadioButtonScrollGroupItemProps[];
};

type BaseRadioButtonScrollGroupItemProps = {
  id: number;
  image: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const BaseRadioButtonScrollGroup = ({
  items,
}: BaseRadioButtonScrollGroupProps) => {
  const handleClickItem = (item: BaseRadioButtonScrollGroupItemProps) => () => {
    // 이미 선택된 상태 변경 무시
    if (item.checked) return;

    // 가짜 이벤트 객체를 생성하여 onChange 함수 호출
    item.onChange({
      target: {
        checked: true,
        value: item.value,
        type: 'radio',
        name: 'themeRadioSlide',
      } as HTMLInputElement,
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div css={scrollerStyle}>
      {items.map((item) => (
        <div
          key={item.id}
          css={itemStyle}
          role="button"
          tabIndex={0}
          onClick={handleClickItem(item)}
          onKeyDown={(e) => {
            // 키보드 이벤트 핸들러 (필수)
            // Enter 키나 Space 키를 눌렀을 때도 클릭 이벤트와 동일하게 작동하도록 처리
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault(); // 스페이스바의 기본 동작(스크롤 등) 방지
              handleClickItem(item); // 클릭과 동일한 동작 수행
            }
          }}
        >
          <img alt="" css={imgStyle(item.checked)} src={item.image} />
          <input
            checked={item.checked}
            css={radioButtonStyle}
            name="themeRadioSlide"
            type="radio"
            value={item.value}
            onChange={item.onChange}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ))}
    </div>
  );
};

const scrollerStyle = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
  overflow-x: auto;
  padding: 10px 0;
  flex-wrap: nowrap;
`;

const itemStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 auto;
  position: relative;
  display: inline-block;
`;

const imgStyle = (checked: boolean) => css`
  width: 80px;
  height: 100%;
  display: block;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;
  pointer-events: none; // 이미지가 포인터 이벤트를 잡지 않도록
  border: ${checked ? '1.5px solid var(--gray8)' : '1px solid var(--gray4)'};
  border-radius: 8px;
`;

const radioButtonStyle = css`
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  top: 8px;
  left: 8px;
  width: 18px;
  height: 18px;
  appearance: none;
  border-radius: 50%;
  border: 1px solid var(--gray4);
  background: var(--gray4);
  backdrop-filter: blur(4px);
  cursor: pointer;

  &::after {
    content: '✔';
    position: relative; // relative로 둬서 부모 중앙 정렬된 flex에 맞춤
    display: inline-block;
    font-size: 14px;
    color: var(--gray1);
    opacity: 0;
    transition: opacity 0.15s ease;
  }

  &:checked {
    background: var(--gray10);
    border-color: var(--gray10);
  }

  &:checked::after {
    opacity: 1;
  }
`;

export default BaseRadioButtonScrollGroup;
