import { Stack } from 'expo-router';

import withAuthentication from '@/components/HOC/withAuthentication';

function DashboardLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default withAuthentication(DashboardLayout);
