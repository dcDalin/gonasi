import { View } from 'react-native';

import MobileContainer from '@/components/containers/MobileContainer';
import LoginForm from '@/components/forms/LoginForm';
import GoHead from '@/components/GoHead';
import GoText from '@/components/GoText';
import AuthLayout from '@/components/layouts/AuthLayout';

export default function LoginScreen() {
  return (
    <MobileContainer topInset={false}>
      <GoHead title="Login" />
      <AuthLayout
        authForm={<LoginForm />}
        bottomSection={
          <View>
            <GoText text="Don't have an account? " />
            {/* <Link href="/auth/signup" text="Sign Up" /> */}
          </View>
        }
      />
    </MobileContainer>
  );
}
