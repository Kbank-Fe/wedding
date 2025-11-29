import { css } from '@emotion/react';
import React, { useEffect, useRef } from 'react';

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
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false); // 드래그발생여부

  useEffect(() => {
    // 이미지 드래그 시 브라우저 기본 드래그 이벤트 방지
    const el = scrollerRef.current;
    if (!el) return;
    const imgs = el.querySelectorAll('img');
    imgs.forEach((img) => img.setAttribute('draggable', 'false'));
    return () => {
      imgs.forEach((img) => img.removeAttribute('draggable'));
    };
  }, [items]);

  // 드래그 시작
  const onMouseDown: React.MouseEventHandler = (e) => {
    const el = scrollerRef.current;
    if (!el) return;
    isDownRef.current = true; // 드래그 상태 설정
    hasDraggedRef.current = false; // 새로운 드래그 세션 시작
    el.classList.add('dragging'); // CSS cursor 변경용
    startXRef.current = e.pageX - el.offsetLeft; // 현재 마우스 X 좌표 설정
    scrollLeftRef.current = el.scrollLeft; // 현재 스크롤 위치 설정
    document.body.style.userSelect = 'none'; // 드래그 시 텍스트 선택 방지
  };

  // 드래그 종료
  const onMouseEnd: React.MouseEventHandler = () => {
    const el = scrollerRef.current;
    if (!el) return;
    isDownRef.current = false; // 드래그 상태 해제
    el.classList.remove('dragging');
    document.body.style.userSelect = '';
  };

  // 드래그 이동
  const onMouseMove: React.MouseEventHandler = (e) => {
    const el = scrollerRef.current;
    if (!el || !isDownRef.current) return; // 드래그 상태일 때만 동작

    // 5px 이상 움직이면 드래그로 간주
    const dx = Math.abs(e.pageX - (startXRef.current + el.offsetLeft));
    if (dx > 5) {
      hasDraggedRef.current = true;
    }

    e.preventDefault(); // 브라우저 기본 드래그 동작 방지
    const x = e.pageX - el.offsetLeft; // 현재 마우스 x 위치
    const walk = (x - startXRef.current) * 1; // 스크롤 민감도 (1 = 1:1)
    el.scrollLeft = scrollLeftRef.current - walk; // 스크롤 위치 업데이트 = 스크롤 시작 위치 - 이동거리
  };

  // 터치 지원 (모바일)
  const onTouchStart: React.TouchEventHandler = (e) => {
    const el = scrollerRef.current;
    if (!el) return;
    isDownRef.current = true;
    hasDraggedRef.current = false; // 터치 다운 시 드래그 리셋
    startXRef.current = e.touches[0].pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const onTouchMove: React.TouchEventHandler = (e) => {
    const el = scrollerRef.current;
    if (!el || !isDownRef.current) return;
    const x = e.touches[0].pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1;

    const dx = Math.abs(x - startXRef.current);
    if (dx > 5) {
      // 5px 이상 움직이면 드래그로 간주
      hasDraggedRef.current = true;
    }

    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const onTouchEnd = () => {
    isDownRef.current = false;
  };

  const handleClickImage =
    (item: BaseRadioButtonScrollGroupItemProps) => () => {
      // 1. 드래그가 끝난 직후 발생한 클릭 무시
      if (hasDraggedRef.current) {
        return;
      }

      // 2. 이미 선택된 상태 변경 무시
      if (item.checked) return;

      // 3. 가짜 이벤트 객체를 생성하여 onChange 함수 호출
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
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      ref={scrollerRef}
      css={scrollerStyle}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseEnd}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseEnd}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      onTouchStart={onTouchStart}
    >
      {items.map((item) => (
        <div
          key={item.id}
          css={itemStyle}
          role="button"
          tabIndex={0}
          onClick={handleClickImage(item)}
          onKeyDown={(e) => {
            // 키보드 이벤트 핸들러 (필수)
            // Enter 키나 Space 키를 눌렀을 때도 클릭 이벤트와 동일하게 작동하도록 처리
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault(); // 스페이스바의 기본 동작(스크롤 등) 방지
              handleClickImage(item); // 클릭과 동일한 동작 수행
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

  // 1. 가로 스크롤 활성화
  overflow-x: auto;
  -webkit-overflow-scrolling: touch; // iOS에서 부드러운 스크롤
  padding: 10px 0;
  flex-wrap: nowrap;
  width: 100%;
  box-sizing: border-box;

  // 2. 커서 스타일
  cursor: grab;
  &.dragging {
    cursor: grabbing;
  }

  // 3. 기타 설정
  user-select: none; // 콘텐츠 선택 방지
  scrollbar-width: none; // Firefox 스크롤바 숨기기
  &::-webkit-scrollbar {
    display: none; // WebKit/Chrome 스크롤바 숨기기
  }
`;

const itemStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 90px;
  flex: 0 0 auto;
  box-sizing: border-box;
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
