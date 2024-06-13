import { View } from 'react-native';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';

import SocialAuthButtons from '@/components/forms/SocialAuthButtons';
import GoDivider from '@/components/GoDivider';

interface IAuthLayoutProps {
  authForm: React.ReactNode;
  bottomSection: React.ReactNode;
}

export default function AuthLayout(props: IAuthLayoutProps) {
  const { authForm, bottomSection } = props;

  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <SocialAuthButtons />
        <GoDivider text="OR" />
        <View>{authForm}</View>
      </View>
      <View style={styles.bottom}>{bottomSection}</View>
    </View>
  );
}

const stylesheet = createStyleSheet(({ size }) => ({
  container: {
    flex: 1,
    marginBottom: UnistylesRuntime.insets.bottom,
    justifyContent: 'space-between',
    paddingBottom: size.lg,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  bottom: {
    alignItems: 'center',
  },
}));
