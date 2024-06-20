import withoutAuthentication from '@/components/HOC/withoutAuthentication';
import AuthStack from '@/components/stacks/AuthStack';

function AuthScreenLayout() {
  return (
    <>
      <AuthStack />
    </>
  );
}

export default withoutAuthentication(AuthScreenLayout);
