import { View } from 'react-native';

import GoButton from '@/components/GoButton';
import GoText from '@/components/GoText';
import { supabase } from '@/lib/supabase';

export default function ProfileTabScreen() {
  return (
    <View>
      <GoText text="Profile goes here" />
      <GoButton onPress={() => supabase.auth.signOut()} text="Logout" />
    </View>
  );
}
