import { typography } from '@/unistyles/fonts';
import adjustColorBrightness from '@/utils/adjustColorBrightness';

// Define all color variables
const primary = '#ff7f0e';
const secondary = '#2ca02c';
const accent = '#9467bd';
const neutralLight = '#a3a3a3';
const neutralDark = '#3f3f3f';
const info = '#1f77b4';
const success = '#2ca02c';
const warning = '#ff7f0e';
const error = '#d62728';
const transparent = 'rgba(0, 0, 0, 0)';

const lightBase100 = '#ffffff';
const lightBase200 = '#f0f0f0';
const lightBase300 = '#e0e0e0';
const lightNeutralContent = '#000000';
const lightPrimaryContent = '#ffffff';
const lightSecondaryContent = '#ffffff';
const lightAccentContent = '#ffffff';
const lightInfoContent = '#ffffff';
const lightSuccessContent = '#ffffff';
const lightWarningContent = '#000000';
const lightErrorContent = '#ffffff';

const darkBase100 = '#171717';
const darkBase200 = '#131313';
const darkBase300 = '#0f0f0f';
const darkNeutralContent = '#cdd3d1';
const darkPrimaryContent = '#000000';
const darkSecondaryContent = '#002e02';
const darkAccentContent = '#5d1a8b';
const darkBaseContent = '#cac9c9';
const darkSuccessContent = '#000000';

const generateTheme = (isDark: boolean) => ({
  colors: {
    primary,
    primaryLight: adjustColorBrightness(primary),
    primaryContent: isDark ? darkPrimaryContent : lightPrimaryContent,
    secondary,
    secondaryLight: adjustColorBrightness(secondary),
    secondaryContent: isDark ? darkSecondaryContent : lightSecondaryContent,
    accent,
    accentLight: adjustColorBrightness(accent),
    accentContent: isDark ? darkAccentContent : lightAccentContent,
    neutral: isDark ? neutralDark : neutralLight,
    neutralLight: adjustColorBrightness(isDark ? neutralDark : neutralLight),
    neutralContent: isDark ? darkNeutralContent : lightNeutralContent,
    base100: isDark ? darkBase100 : lightBase100,
    base200: isDark ? darkBase200 : lightBase200,
    base300: isDark ? darkBase300 : lightBase300,
    baseContent: isDark ? darkBaseContent : lightNeutralContent,
    info,
    infoContent: lightInfoContent,
    success,
    successContent: isDark ? darkSuccessContent : lightSuccessContent,
    warning,
    warningContent: lightWarningContent,
    error,
    errorContent: lightErrorContent,
    transparent,
  },
  size: {
    xxxs: 2,
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  fontSize: {
    xxl: { fontSize: 36, lineHeight: 44 },
    xl: { fontSize: 24, lineHeight: 34 },
    lg: { fontSize: 20, lineHeight: 32 },
    md: { fontSize: 18, lineHeight: 26 },
    sm: { fontSize: 16, lineHeight: 24 },
    xs: { fontSize: 14, lineHeight: 21 },
    xxs: { fontSize: 12, lineHeight: 18 },
    xxxs: { fontSize: 10, lineHeight: 14 },
  },
  typography,
});

export const lightTheme = generateTheme(false);
export const darkTheme = generateTheme(true);
