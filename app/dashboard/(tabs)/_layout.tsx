import { Tabs } from 'expo-router';
import { Home, User } from 'lucide-react-native';

import ProfileIcon from '@/components/ProfileIcon';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: 'Courses',
          tabBarIcon: ({ color }) => <User size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: () => <ProfileIcon />,
        }}
      />
    </Tabs>
  );
}
