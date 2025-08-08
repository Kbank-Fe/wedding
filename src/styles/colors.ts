import * as RadixColors from '@radix-ui/colors';

const lightColors = {
  ...RadixColors.gray,
  ...RadixColors.amber,
  ...RadixColors.blue,
  ...RadixColors.red,
};

const darkColors = {
  ...RadixColors.grayDark,
  ...RadixColors.amberDark,
  ...RadixColors.blueDark,
  ...RadixColors.redDark,
};

type Colors = Record<string, string>;

const createCssVariables = (colors: Colors) =>
  Object.entries(colors)
    .map(([key, value]) => `--${key}: ${value};`)
    .join('\n');

export const lightThemeColors = createCssVariables(lightColors);
export const darkThemeColors = createCssVariables(darkColors);
