import { Tabs } from 'expo-router';
import { Home, LibraryBig } from 'lucide-react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import Avatar from '@/components/Avatar';

export default function TabsLayout() {
  const {
    styles,
    theme: { colors },
  } = useStyles(stylesheet);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.baseContent,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: 'Courses',
          tabBarIcon: ({ color }) => <LibraryBig size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Avatar size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}

const stylesheet = createStyleSheet(({ colors, typography, fontSize }) => ({
  tabBarStyle: {
    backgroundColor: colors.base100,
    borderTopWidth: 4,
    borderTopColor: colors.base200,
  },
  tabBarLabel: {
    ...fontSize.xs,
    fontFamily: typography.secondary.light,
  },
}));
