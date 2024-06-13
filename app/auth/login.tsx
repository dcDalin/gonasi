import { useNavigation } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Text } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import MobileContainer from '@/components/containers/MobileContainer';
import { useHeader } from '@/utils/useHeader';

export default function LoginScreen() {
  const navigation = useNavigation();
  const {
    theme: { colors },
  } = useStyles();

  useHeader(
    {
      leftIcon: <ArrowLeft color={colors.baseContent} size={20} />,
      title: 'Login',
      onLeftPress: () => navigation.goBack(),
    },
    []
  );

  return (
    <MobileContainer topInset={false}>
      <Text>Login Screen</Text>
    </MobileContainer>
  );
}
