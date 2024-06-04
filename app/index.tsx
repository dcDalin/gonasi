import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function HomeScreen() {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.base100,
  },
  text: {
    color: theme.colors.baseContent,
    fontFamily: theme.typography.primary.bold,
  },
}));
