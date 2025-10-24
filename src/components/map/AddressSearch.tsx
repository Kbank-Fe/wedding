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
      css={buttonStyle}
      disabled={!ready || disabled}
      onClick={open}
    >
      {buttonText}
    </button>
  );
}

const buttonStyle = css`
  margin-top: 0.3rem;
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  color: var(--gray11);
  background-color: var(--gray2);
  border: 1px solid var(--gray4);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition:
    border-color 0.25s ease,
    background-color 0.25s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover {
    background-color: var(--gray8);
    color: var(--gray1);
    border-color: var(--gray8);
  }

  &:active {
    background-color: var(--gray11);
    color: var(--gray1);
    border-color: var(--gray11);
  }
`;
