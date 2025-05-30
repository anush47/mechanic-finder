export const colors = {
  primary: {
    50: '#E6F0FA',
    100: '#CCE1F5',
    200: '#99C3EB',
    300: '#66A5E1',
    400: '#3387D7',
    500: '#0057B8', // Primary brand color
    600: '#004693',
    700: '#00346E',
    800: '#00234A',
    900: '#001125',
  },
  secondary: {
    50: '#E6EFFA',
    100: '#CCDEF5',
    200: '#99BEED',
    300: '#669DE4',
    400: '#337CDB',
    500: '#005BD2',
    600: '#0049A8',
    700: '#00377E',
    800: '#002454',
    900: '#00122A',
  },
  accent: {
    50: '#FFEEEC',
    100: '#FFDDD9',
    200: '#FFBBB3',
    300: '#FF9A8D',
    400: '#FF7866',
    500: '#FF4438', // Accent color
    600: '#CC372D',
    700: '#992922',
    800: '#661C17',
    900: '#330E0B',
  },
  success: {
    50: '#E6F6ED',
    100: '#CCEDDB',
    200: '#99DCB7',
    300: '#66CA94',
    400: '#33B970',
    500: '#00A74C',
    600: '#00863D',
    700: '#00642E',
    800: '#00431E',
    900: '#00210F',
  },
  warning: {
    50: '#FFF8E6',
    100: '#FFF1CC',
    200: '#FFE499',
    300: '#FFD666',
    400: '#FFC933',
    500: '#FFBB00',
    600: '#CC9600',
    700: '#997000',
    800: '#664B00',
    900: '#332500',
  },
  error: {
    50: '#FCEAE7',
    100: '#F9D5CF',
    200: '#F3AB9F',
    300: '#ED826F',
    400: '#E7583F',
    500: '#E12D0F',
    600: '#B4240C',
    700: '#871B09',
    800: '#5A1206',
    900: '#2D0903',
  },
  gray: {
    50: '#F7F7F7',
    100: '#EFEFEF',
    200: '#DFDFDF',
    300: '#CFCFCF',
    400: '#BFBFBF',
    500: '#AFAFAF',
    600: '#8C8C8C',
    700: '#696969',
    800: '#464646',
    900: '#232323',
  },
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

// Dark mode colors
export const darkColors = {
  ...colors,
  primary: {
    ...colors.primary,
    500: '#3387D7', // Adjusted for dark mode
  },
  accent: {
    ...colors.accent,
    500: '#FF6B59', // Adjusted for dark mode
  },
  gray: {
    50: '#2A2A2A',
    100: '#323232',
    200: '#3F3F3F',
    300: '#4D4D4D',
    400: '#5A5A5A',
    500: '#676767',
    600: '#848484',
    700: '#A1A1A1',
    800: '#BEBEBE',
    900: '#DBDBDB',
  },
};