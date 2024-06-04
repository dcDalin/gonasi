import '../unistyles/unistyles';
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

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const userTheme = colorScheme === 'dark' ? 'dark' : 'light';

  useInitialTheme(userTheme);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

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
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
