import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import GoText from '@/components/GoText';

interface IGoDividerProps {
  text: string;
}

export default function GoDivider(props: IGoDividerProps) {
  const { text } = props;

  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.wrapper}>
      <View style={styles.divider}></View>
      <GoText text={text} style={styles.text} />
      <View style={styles.divider}></View>
    </View>
  );
}

const stylesheet = createStyleSheet(({ size, colors }) => ({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: size.sm,
  },
  divider: {
    borderTopWidth: 0.5,
    borderTopColor: colors.neutral,
    flex: 1,
  },
  text: {
    paddingHorizontal: size.md,
  },
}));
