import { View } from 'react-native';
import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';

import adjustColorBrightness from '@/utils/adjustColorBrightness';

import GoText from './GoText';

function GoSuccessToast(props: BaseToastProps) {
  const { text1 } = props;

  const { styles } = useStyles(stylesheet);

  return (
    <View style={[styles.wrapper, styles.wrapperSuccess]}>
      <GoText text={text1} style={styles.text1Style} />
    </View>
  );
}

function GoErrorToast(props: BaseToastProps) {
  const { text1 } = props;

  const { styles } = useStyles(stylesheet);

  return (
    <View style={[styles.wrapper, styles.wrapperError]}>
      <GoText text={text1} style={styles.text1Style} />
    </View>
  );
}

function SuccessToast(props: BaseToastProps) {
  return <BaseToast {...props} />;
}

function DefaultErrorToast(props: BaseToastProps) {
  return <ErrorToast {...props} />;
}

export const GoToastConfig = {
  success: (props: BaseToastProps) => <SuccessToast {...props} />,
  error: (props: BaseToastProps) => <DefaultErrorToast {...props} />,
  goSuccess: (props: BaseToastProps) => <GoSuccessToast {...props} />,
  goError: (props: BaseToastProps) => <GoErrorToast {...props} />,
};

const stylesheet = createStyleSheet(
  ({ size, fontSize, typography, colors }) => ({
    wrapper: {
      borderRadius: size.md,
      borderLeftWidth: 4,
      paddingHorizontal: size.md,
      paddingVertical: size.xxs,
      marginTop: UnistylesRuntime.insets.top - size.lg,
    },
    wrapperSuccess: {
      backgroundColor: adjustColorBrightness(colors.success, 40),
      borderLeftColor: colors.success,
    },
    wrapperError: {
      backgroundColor: adjustColorBrightness(colors.error, 40),
      borderLeftColor: colors.error,
    },
    text1Style: {
      ...fontSize.md,
      color: colors.successContent,
      fontFamily: typography.primary.normal,
    },
  })
);
