import { View } from 'react-native';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';

interface IMobileContainerProps {
  children: React.ReactNode;
  topInset?: boolean;
}

export default function MobileContainer(props: IMobileContainerProps) {
  const { children, topInset = true } = props;

  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.bg}>
      <View style={styles.container(topInset)}>{children}</View>
    </View>
  );
}

const stylesheet = createStyleSheet(({ colors, size }) => ({
  bg: {
    flex: 1,
    backgroundColor: colors.base100,
  },
  container: (topInset: boolean) => ({
    flex: 1,
    paddingTop: topInset ? UnistylesRuntime.insets.top : 0,
    width: {
      xs: '100%',
      sm: '100%',
      md: '60%',
      lg: '40%',
    },
    margin: 'auto',
    paddingHorizontal: {
      xs: size.md,
    },
  }),
}));
