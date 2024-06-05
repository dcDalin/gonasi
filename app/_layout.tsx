import '../unistyles';
import 'react-native-reanimated';

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { useInitialTheme } from 'react-native-unistyles';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import GoHead from '@/components/GoHead';
import HomeStack from '@/components/stacks/HomeStack';
import { persistor, store } from '@/store/store';
import { customFontsToLoad } from '@/unistyles/fonts';

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
          <HomeStack />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}
