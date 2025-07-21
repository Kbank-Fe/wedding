import { animate } from 'motion';
import { useEffect } from 'react';

type UseMotionOptions = {
  x?: number;
  y?: number;
  duration?: number;
  delay?: number;
};

// 세로 모션 적용
// T : HTML element 하위 타입 ex) div, span, button, canvas
export function useVerticalMotion<T extends HTMLElement>(
  ref: React.RefObject<T | null>, // T 타입의 DOM 요소를 가리키는useRef ref 객체
  options: UseMotionOptions = {},
) {
  const { y = -20, duration = 1, delay = 0 } = options;

  useEffect(() => {
    if (ref.current) {
      animate(ref.current, { opacity: [0, 1], y: [y, 0] }, { duration, delay });
    }
  }, [ref, y, duration, delay]);
}

// 가로 모션 적용
export function useHorizontalMotion<T extends HTMLElement>(
  ref: React.RefObject<T | null>, // T 타입의 DOM 요소를 가리키는useRef ref 객체
  options: UseMotionOptions = {},
) {
  const { x = -20, duration = 1, delay = 0 } = options;

  useEffect(() => {
    if (ref.current) {
      animate(ref.current, { opacity: [0, 1], x: [x, 0] }, { duration, delay });
    }
  }, [ref, x, duration, delay]);
}
