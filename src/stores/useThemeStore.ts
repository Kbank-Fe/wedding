import { create } from 'zustand';

import { darkThemeColors, lightThemeColors } from '@/styles/colors';

type Theme = 'light' | 'dark';

type ThemeState = {
  theme: Theme;
  toggleTheme: () => void;
  cssVariables: string;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'light',
  cssVariables: lightThemeColors,
  toggleTheme: () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light';
    set({
      theme: newTheme,
      cssVariables: newTheme === 'light' ? lightThemeColors : darkThemeColors,
    });
  },
}));
