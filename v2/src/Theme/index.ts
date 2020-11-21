import { BLACK, BLUE, GOLD, GREY, WHITE } from '../Constants';

export const getCurrentTheme = (scheme: string) => {
  const lightTheme = {
    dark: false,
    colors: {
      primary: BLUE,
      background: WHITE,
      card: WHITE,
      text: BLUE,
      border: GREY,
      notification: 'rgb(255, 69, 58)',
    },
  };

  const darkTheme = {
    dark: true,
    colors: {
      primary: GOLD,
      background: BLACK,
      card: '#000',
      text: WHITE,
      border: GREY,
      notification: 'rgb(255, 69, 58)',
    },
  };

  if (scheme === 'light') {
    return lightTheme;
  }
  return darkTheme;
};
