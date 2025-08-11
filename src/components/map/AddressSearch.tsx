import { css } from '@emotion/react';
import { useCallback, useEffect, useState } from 'react';

import type { AddressSearchProps, DaumWindow } from '@/types/map.types';

export default function AddressSearch({
  buttonText = '주소 검색',
  onSelect,
  disabled,
}: AddressSearchProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    script.onload = () => setReady(true);
    script.onerror = () => setReady(false);
    document.body.appendChild(script);
  }, []);

  const open = useCallback(() => {
    if (!ready || disabled) return;

    const Postcode = (window as DaumWindow).daum?.Postcode;
    if (!Postcode) return;

    new Postcode({
      oncomplete: ({ address }) => address && onSelect(address),
    }).open();
  }, [ready, disabled, onSelect]);

  return (
    <button
      aria-label="주소 검색"
      css={btn}
      disabled={!ready || disabled}
      onClick={open}
    >
      {buttonText}
    </button>
  );
}

const btn = css`
  margin-top: 0.8rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--gray6);
  border-radius: 0.5rem;
  background: #fff;
  font-size: 0.9rem;
  color: var(--gray12);
  cursor: pointer;
  transition:
    background 0.2s,
    box-shadow 0.2s;

  &:hover:not(:disabled) {
    background: var(--gray2);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
