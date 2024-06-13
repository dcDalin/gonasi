import { router } from 'expo-router';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import AppLogo from '@/components/AppLogo';
import MobileContainer from '@/components/containers/MobileContainer';
import GoButton from '@/components/GoButton';
import GoText from '@/components/GoText';

export default function HomeScreen() {
  const { styles } = useStyles(stylesheet);

  return (
    <MobileContainer>
      <View style={styles.container}>
        <View style={styles.logoWrapper}>
          <AppLogo />

          <GoText text="gonasi" preset="h1" style={styles.logoText} />
          <GoText text="Rev Up Your Drive" preset="p3" />
          <GoText
            text="The Ultimate All-in-One Driving Solution!"
            preset="p5"
          />
        </View>
        <View style={styles.bottmView}>
          <GoButton
            text="Let's Go!"
            onPress={() => router.push('/auth/login')}
            preset="primary"
          />
        </View>
      </View>
    </MobileContainer>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  logoWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: theme.colors.baseContent,
  },
  bottmView: {
    paddingBottom: theme.size.xl,
    gap: theme.size.lg,
  },
}));
