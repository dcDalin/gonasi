import { Image } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { supabase } from '@/lib/supabase';
import { useAppSelector } from '@/store/store';

interface IAvatarProps {
  size: number;
  color: string;
}

export default function Avatar(props: IAvatarProps) {
  const { size = 22, color } = props;

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
        style={styles.avatar(size, color)}
      />
    </>
  );
}

const stylesheet = createStyleSheet(() => ({
  avatar: (size: number, color: string) => ({
    height: size,
    width: size,
    borderRadius: size / 2,
    borderWidth: 2,
    borderColor: color,
  }),
}));
