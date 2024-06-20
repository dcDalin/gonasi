import { ActivityIndicator, View } from 'react-native';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';

export default function FullPageLoader() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const stylesheet = createStyleSheet(({ colors }) => ({
  wrapper: {
    flex: 1,
    paddingTop: UnistylesRuntime.insets.top,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.base100,
  },
}));
