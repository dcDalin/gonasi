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
  showSocialIcons?: boolean;
}

export default function AuthLayout(props: IAuthLayoutProps) {
  const { authForm, bottomSection, showSocialIcons = true } = props;

  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        {showSocialIcons && <SocialAuthButtons />}
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
    flexDirection: 'column',
    marginBottom: UnistylesRuntime.insets.bottom,
  },
  main: {
    justifyContent: 'center',
    flex: 1,
  },
  bottom: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: size.xl,
  },
}));
