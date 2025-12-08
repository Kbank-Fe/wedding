import { css } from '@emotion/react';

type BaseRadioButtonScrollGroupProps = {
  items: BaseRadioButtonScrollGroupItemProps[];
};

type BaseRadioButtonScrollGroupItemProps = {
  image: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const BaseRadioButtonScrollGroup = ({
  items,
}: BaseRadioButtonScrollGroupProps) => {
  return (
    <div css={scrollerStyle}>
      {items.map((item) => (
        <label key={item.value} aria-label={item.value} css={labelWrapperStyle}>
          <img
            alt={`${item.value} 테마 미리보기 이미지`}
            css={imgStyle(item.checked)}
            src={item.image}
          />
          <input
            checked={item.checked}
            css={radioButtonStyle}
            name="themeRadioSlide"
            type="radio"
            value={item.value}
            onChange={item.onChange}
          />
        </label>
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

const labelWrapperStyle = css`
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
