import { useNavigation } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useStyles } from 'react-native-unistyles';

import MobileContainer from '@/components/containers/MobileContainer';
import LoginForm from '@/components/forms/LoginForm';
import GoHead from '@/components/GoHead';
import GoLink from '@/components/GoLink';
import GoText from '@/components/GoText';
import AuthLayout from '@/components/layouts/AuthLayout';
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
      <GoHead title="Login" />
      <AuthLayout
        authForm={<LoginForm />}
        bottomSection={
          <GoText>
            <GoText text="Don't have an account? " />
            <GoLink text="Create one today." href="auth/signup" />
          </GoText>
        }
      />
    </MobileContainer>
  );
}
