import { View } from 'react-native';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';

interface IMobileContainerProps {
  children: React.ReactNode;
}

export default function MobileContainer(props: IMobileContainerProps) {
  const { children } = props;

  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.bg}>
      <View style={styles.container}>{children}</View>
    </View>
  );
}

const stylesheet = createStyleSheet(({ colors, margins }) => ({
  bg: {
    flex: 1,
    backgroundColor: colors.base100,
  },
  container: {
    flex: 1,
    paddingTop: UnistylesRuntime.insets.top,
    width: {
      xs: '100%',
      sm: '100%',
      md: '60%',
      lg: '40%',
    },
    margin: 'auto',
    paddingHorizontal: {
      xs: margins.md,
    },
  },
}));
