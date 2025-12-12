import { css } from '@emotion/react';
import { FaCheck } from 'react-icons/fa';

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
            css={radioInputStyle}
            name="themeRadioSlide"
            type="radio"
            value={item.value}
            onChange={item.onChange}
          />
          {item.checked && (
            <div css={checkIconWrapperStyle}>
              <FaCheck css={checkIconStyle} />
            </div>
          )}
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
  cursor: pointer;
`;

const imgStyle = (checked: boolean) => css`
  display: block;
  width: 90px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;
  border: ${checked ? '1px solid var(--gray11)' : '1px solid var(--gray4)'};
  border-radius: 8px;
`;

const radioControlBaseStyle = css`
  position: absolute;
  top: 8px;
  left: 8px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const radioInputStyle = css`
  ${radioControlBaseStyle}
  border: 1px solid var(--gray4);
  background: var(--gray2);
  z-index: 1;
  appearance: none;
`;

const checkIconWrapperStyle = css`
  ${radioControlBaseStyle}
  background: var(--gray2);
  border: 1px solid var(--gray11);
  z-index: 2;
`;

const checkIconStyle = css`
  font-size: 8px;
  color: var(--gray11);
  display: block;
`;

export default BaseRadioButtonScrollGroup;
