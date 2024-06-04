import {
  Montserrat_100Thin,
  Montserrat_100Thin_Italic,
  Montserrat_400Regular,
  Montserrat_400Regular_Italic,
  Montserrat_600SemiBold,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
} from '@expo-google-fonts/montserrat';
import {
  Signika_300Light,
  Signika_400Regular,
  Signika_500Medium,
  Signika_600SemiBold,
  Signika_700Bold,
} from '@expo-google-fonts/signika';

export const customFontsToLoad = {
  Montserrat_100Thin,
  Montserrat_100Thin_Italic,
  Montserrat_400Regular,
  Montserrat_400Regular_Italic,
  Montserrat_600SemiBold,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,

  Signika_300Light,
  Signika_400Regular,
  Signika_500Medium,
  Signika_600SemiBold,
  Signika_700Bold,
};

const fonts = {
  montserrat: {
    light: 'Montserrat_100Thin',
    normal: 'Montserrat_400Regular',
    normalItalic: 'Montserrat_400Regular_Italic',
    semiBold: 'Montserrat_600SemiBold',
    semiBoldItalic: 'Montserrat_600SemiBold_Italic',
    bold: 'Montserrat_700Bold',
    boldItalaic: 'Montserrat_700Bold_Italic',
  },
  signika: {
    thin: 'Signika_300Light',
    light: 'Signika_400Regular',
    normal: 'Signika_500Medium',
    medium: 'Signika_600SemiBold',
    bold: 'Signika_700Bold',
  },
};

export const typography = {
  primary: fonts.montserrat,
  secondary: fonts.signika,
};
