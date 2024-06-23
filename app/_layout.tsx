import '../unistyles';
import 'react-native-reanimated';

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { AppState, useColorScheme } from 'react-native';
import Toast from 'react-native-toast-message';
import { useInitialTheme } from 'react-native-unistyles';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import GoHead from '@/components/GoHead';
import { GoToastConfig } from '@/components/GoToastConfig';
import { supabase } from '@/lib/supabase';
import { persistor, store } from '@/store/store';
import { customFontsToLoad } from '@/unistyles/fonts';

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === 'dark';
  const userTheme = isDarkTheme ? DarkTheme : DefaultTheme;

  const [loaded] = useFonts(customFontsToLoad);

  useInitialTheme(isDarkTheme ? 'dark' : 'light');

  const hideSplashScreen = () => {
    SplashScreen.hideAsync();
  };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const onBeforeLiftPersistGate = () => {
    setTimeout(hideSplashScreen, 500);
  };

  return (
    <ThemeProvider value={userTheme}>
      <Provider store={store}>
        <PersistGate
          loading={null}
          onBeforeLift={onBeforeLiftPersistGate}
          persistor={persistor}
        >
          <GoHead title="Welcome" />
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="(public)" />
            <Stack.Screen name="dashboard" />
          </Stack>
          <Toast config={GoToastConfig} />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}
