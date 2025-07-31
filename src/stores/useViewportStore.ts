import { create } from 'zustand';

type ViewportStore = {
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;
};

export const useViewportStore = create<ViewportStore>((set) => ({
  isMobile: false,
  setIsMobile: (value) => set({ isMobile: value }),
}));
