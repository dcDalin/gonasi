import { Stack } from 'expo-router';

import withoutAuthentication from '@/components/HOC/withoutAuthentication';

function HomeStack() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default withoutAuthentication(HomeStack);
