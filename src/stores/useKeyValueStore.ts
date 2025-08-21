import { create } from 'zustand';

type KeyValueState<T> = {
  data: Record<string, T>;
  setValue: (key: string, value: T) => void;
  removeValue: (key: string) => void;
  clear: () => void;
};

export const createKeyValueStore = <T>() =>
  create<KeyValueState<T>>((set) => ({
    data: {},
    setValue: (key, value) =>
      set((state) => ({
        data: { ...state.data, [key]: value },
      })),
    removeValue: (key) =>
      set((state) => {
        const newData = { ...state.data };
        delete newData[key];
        return { data: newData };
      }),
    clear: () => set({ data: {} }),
  }));

// 예시: value 가 string 타입인 key-value store
export const useStringStore = createKeyValueStore<string>();

// 예시: value 가 사용자 정의 타입인 key-value store
type User = { id: number; name: string };
export const useUserStore = createKeyValueStore<User>();
