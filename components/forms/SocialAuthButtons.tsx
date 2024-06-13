import { useColorScheme, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import GoButton from '../GoButton';
import GoIcon from '../GoIcon';

export default function SocialAuthButtons() {
  const { styles } = useStyles(stylesheet);

  const theme = useColorScheme();

  return (
    <View style={styles.wrapper}>
      <GoButton
        onPress={() => {}}
        preset="outline"
        centerButton={
          <GoIcon icon={theme === 'dark' ? 'apple' : 'appleBlack'} size={20} />
        }
      />
      <GoButton
        onPress={() => {}}
        preset="outline"
        centerButton={<GoIcon icon={'google'} size={20} />}
      />
      <GoButton
        onPress={() => {}}
        preset="outline"
        centerButton={<GoIcon icon={'facebook'} size={20} />}
      />
    </View>
  );
}

const stylesheet = createStyleSheet(({ size }) => ({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));
