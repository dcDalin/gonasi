import { Image } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { supabase } from '@/lib/supabase';
import { useAppSelector } from '@/store/store';

export default function Avatar() {
  const { styles } = useStyles(stylesheet);

  const { profile } = useAppSelector((state) => state.profile);

  const {
    data: { publicUrl },
  } = supabase.storage.from('avatars').getPublicUrl(profile.avatarUrl);

  return (
    <>
      <Image
        source={{
          uri: publicUrl,
        }}
        accessibilityLabel="Avatar"
        style={styles.avatar}
      />
    </>
  );
}

const stylesheet = createStyleSheet(({ size, colors }) => ({
  avatar: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.baseContent,
  },
}));
