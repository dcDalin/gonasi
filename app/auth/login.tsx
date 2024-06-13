import { useNavigation } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import MobileContainer from '@/components/containers/MobileContainer';
import GoButton from '@/components/GoButton';
import { GoTextField } from '@/components/GoTextField';
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
      <GoTextField label={'undefined'} helper="some help" status="error" />
      <View style={{ paddingVertical: 10 }}></View>
      <GoButton text="Let's Go!" onPress={() => {}} preset="primary" />
    </MobileContainer>
  );
}
