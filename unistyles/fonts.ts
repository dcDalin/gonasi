import {
  BarlowCondensed_300Light,
  BarlowCondensed_400Regular,
  BarlowCondensed_500Medium,
  BarlowCondensed_600SemiBold,
  BarlowCondensed_700Bold,
} from '@expo-google-fonts/barlow-condensed';
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

export const customFontsToLoad = {
  Montserrat_100Thin,
  Montserrat_100Thin_Italic,
  Montserrat_400Regular,
  Montserrat_400Regular_Italic,
  Montserrat_600SemiBold,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,

  BarlowCondensed_300Light,
  BarlowCondensed_400Regular,
  BarlowCondensed_500Medium,
  BarlowCondensed_600SemiBold,
  BarlowCondensed_700Bold,
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
  barlow: {
    thin: 'BarlowCondensed_300Light',
    light: 'BarlowCondensed_400Regular',
    normal: 'BarlowCondensed_500Medium',
    medium: 'BarlowCondensed_600SemiBold',
    bold: 'BarlowCondensed_700Bold',
  },
};

export const typography = {
  primary: fonts.montserrat,
  secondary: fonts.barlow,
};
