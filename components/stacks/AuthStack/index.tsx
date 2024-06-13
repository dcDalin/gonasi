import { Stack } from 'expo-router';

export default function AuthStack() {
  return (
    <Stack>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}
