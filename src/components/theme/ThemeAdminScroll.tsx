/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useRef } from 'react';

interface ThemeAdminScrollProps {
  items: {
    id: number;
    img: string;
    value: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }[];
}

const ThemeAdminScroll = ({ items }: ThemeAdminScrollProps) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

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

  const onMouseDown: React.MouseEventHandler = (e) => {
    const el = scrollerRef.current;
    if (!el) return;
    isDownRef.current = true;
    el.classList.add('dragging'); // CSS cursor 변경용
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
    // prevent text selection while dragging
    document.body.style.userSelect = 'none';
  };

  const onMouseLeave: React.MouseEventHandler = () => {
    const el = scrollerRef.current;
    if (!el) return;
    isDownRef.current = false;
    el.classList.remove('dragging');
    document.body.style.userSelect = '';
  };

  const onMouseUp: React.MouseEventHandler = () => {
    const el = scrollerRef.current;
    if (!el) return;
    isDownRef.current = false;
    el.classList.remove('dragging');
    document.body.style.userSelect = '';
  };

  const onMouseMove: React.MouseEventHandler = (e) => {
    const el = scrollerRef.current;
    if (!el || !isDownRef.current) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1; // 스크롤 민감도 (1 = 1:1)
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  // 터치 지원 (모바일)
  const onTouchStart: React.TouchEventHandler = (e) => {
    const el = scrollerRef.current;
    if (!el) return;
    isDownRef.current = true;
    startXRef.current = e.touches[0].pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const onTouchMove: React.TouchEventHandler = (e) => {
    const el = scrollerRef.current;
    if (!el || !isDownRef.current) return;
    const x = e.touches[0].pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1;
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const onTouchEnd = () => {
    isDownRef.current = false;
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      ref={scrollerRef}
      css={scrollerStyle}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      onTouchStart={onTouchStart}
    >
      {items.map((item) => (
        <div key={item.id} css={itemStyle}>
          <img alt="" css={imgStyle} src={item.img} />
          <label css={labelStyle}>{item.value}</label>
          <input
            checked={item.checked}
            name="themeRadioSlide"
            type="radio"
            value={item.value}
            onChange={item.onChange}
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
  -webkit-overflow-scrolling: touch;
  padding: 10px 0;
  flex-wrap: nowrap;
  width: 100%;
  box-sizing: border-box;

  cursor: grab;
  &.dragging {
    cursor: grabbing;
  }

  /* 선택 방지 */
  user-select: none;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const itemStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 90px;
  flex: 0 0 auto;
  box-sizing: border-box;
  border: 1px solid var(--gray8);
  border-radius: 8px;
`;

const imgStyle = css`
  width: 80px;
  height: 100px;
  display: block;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;
  pointer-events: none; /* 이미지가 포인터 이벤트를 잡지 않도록 */
`;

const labelStyle = css`
  margin-bottom: 6px;
  font-size: 12px;
`;

export default ThemeAdminScroll;
