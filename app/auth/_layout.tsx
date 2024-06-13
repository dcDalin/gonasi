import { useNavigation } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useStyles } from 'react-native-unistyles';

import AuthStack from '@/components/stacks/AuthStack';
import { useHeader } from '@/utils/useHeader';

export default function AuthScreenLayout() {
  const navigation = useNavigation();

  const {
    theme: { colors },
  } = useStyles();

  useHeader(
    {
      leftIcon: <ArrowLeft color={colors.baseContent} size={20} />,

      onLeftPress: () => navigation.goBack(),
    },
    []
  );

  return (
    <>
      <AuthStack />
    </>
  );
}
