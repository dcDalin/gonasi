import { Stack } from 'expo-router';
import { useEffect } from 'react';

import { resetErrors } from '@/store/authSlice';
import { useAppDispatch } from '@/store/store';

export default function HomeStack() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetErrors());
  }, [dispatch]);

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
