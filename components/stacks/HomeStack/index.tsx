import { Stack } from 'expo-router';

export default function HomeStack() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="auth/login" />
      <Stack.Screen name="auth/signup" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
