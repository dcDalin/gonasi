import { useNavigation } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useStyles } from 'react-native-unistyles';

import MobileContainer from '@/components/containers/MobileContainer';
import SignUpForm from '@/components/forms/SignUpForm';
import GoHead from '@/components/GoHead';
import GoLink from '@/components/GoLink';
import GoText from '@/components/GoText';
import AuthLayout from '@/components/layouts/AuthLayout';
import { useHeader } from '@/utils/useHeader';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const {
    theme: { colors },
  } = useStyles();

  useHeader(
    {
      leftIcon: <ArrowLeft color={colors.baseContent} size={20} />,
      title: 'Sign Up',
      onLeftPress: () => navigation.goBack(),
    },
    []
  );

  return (
    <MobileContainer topInset={false}>
      <GoHead title="Sign Up" />
      <AuthLayout
        authForm={<SignUpForm />}
        bottomSection={
          <GoText>
            <GoText text="Already have an account? " />
            <GoLink text="Login." href="auth/login" />
          </GoText>
        }
      />
    </MobileContainer>
  );
}
