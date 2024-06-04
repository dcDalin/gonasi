import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface IMainContainerProps {
  children: React.ReactNode;
}

export default function MainContainer(props: IMainContainerProps) {
  const { children } = props;

  const { styles } = useStyles(stylesheet);

  return <View style={styles.container}>{children}</View>;
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.error,
  },
}));
