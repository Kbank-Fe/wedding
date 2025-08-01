import { useEffect } from 'react';

import { useViewportStore } from '@/stores/useViewportStore';

export const useViewportListener = () => {
  const setIsMobile = useViewportStore((state) => state.setIsMobile);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    const listener = () => setIsMobile(media.matches);

    listener();
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [setIsMobile]);
};
