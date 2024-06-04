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

  return <View style={styles.container}>{children}</View>;
}

const stylesheet = createStyleSheet(({ colors, margins }) => ({
  container: {
    flex: 1,
    backgroundColor: colors.base100,
    paddingTop: UnistylesRuntime.insets.top,
    width: {
      xs: '100%',
      sm: '100%',
      md: '60%',
    },
    paddingHorizontal: {
      xs: margins.xl,
    },
  },
}));
