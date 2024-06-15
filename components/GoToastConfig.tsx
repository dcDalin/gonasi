import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import adjustColorBrightness from '@/utils/adjustColorBrightness';

function SuccessToast(props: BaseToastProps) {
  const { styles } = useStyles(stylesheet);

  return (
    <BaseToast
      {...props}
      style={[styles.wrapper, styles.wrapperSuccess]}
      contentContainerStyle={styles.contentContainerStyle}
      text1Style={styles.text1Style}
      text2Style={styles.text2Style}
    />
  );
}

function GoErrorToast(props: BaseToastProps) {
  const { styles } = useStyles(stylesheet);

  return (
    <ErrorToast
      {...props}
      style={[styles.wrapper, styles.wrapperError]}
      contentContainerStyle={styles.contentContainerStyle}
      text1Style={styles.text1Style}
      text2Style={styles.text2Style}
    />
  );
}

export const GoToastConfig = {
  success: (props: BaseToastProps) => <SuccessToast {...props} />,

  error: (props: BaseToastProps) => <GoErrorToast {...props} />,
};

const stylesheet = createStyleSheet(
  ({ size, fontSize, typography, colors }) => ({
    wrapper: {
      borderRadius: size.md,
      borderLeftWidth: 4,
      borderRightWidth: 0,
      width: '50%',
      paddingVertical: 0,
    },
    wrapperSuccess: {
      backgroundColor: adjustColorBrightness(colors.success, 40),
      borderLeftColor: colors.success,
    },
    wrapperError: {
      backgroundColor: adjustColorBrightness(colors.error, 40),
      borderLeftColor: colors.error,
    },
    contentContainerStyle: {
      paddingHorizontal: size.xs,
      paddingVertical: 0,
    },
    text1Style: {
      ...fontSize.md,
      color: colors.successContent,
      fontFamily: typography.primary.bold,
    },
    text2Style: {
      ...fontSize.sm,
      color: colors.successContent,
      fontFamily: typography.secondary.medium,
    },
  })
);
