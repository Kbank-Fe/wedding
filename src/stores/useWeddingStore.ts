import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import type { WeddingInfo } from '@/types/wedding';
import { WEDDING_INITIAL_INFO } from '@/utils/constants/wedding';

type WeddingStore = {
  values: WeddingInfo;

  patch: <K extends keyof WeddingInfo>(
    key: K,
    patch: Partial<WeddingInfo[K]>,
  ) => void;

  setField: <K extends keyof WeddingInfo, P extends keyof WeddingInfo[K]>(
    key: K,
    prop: P,
    value: WeddingInfo[K][P],
  ) => void;

  setDeep: (fn: (draft: WeddingInfo) => void) => void;

  reset: () => void;
};

export const useWeddingStore = create<WeddingStore>()(
  immer((set) => ({
    values: WEDDING_INITIAL_INFO,
    patch: (key, patch) =>
      set((state) => {
        Object.assign(state.values[key], patch);
      }),
    setField: (key, prop, value) =>
      set((state) => {
        state.values[key][prop] = value;
      }),
    setDeep: (fn) =>
      set((state) => {
        fn(state.values);
      }),
    reset: () => set({ values: WEDDING_INITIAL_INFO }),
  })),
);
