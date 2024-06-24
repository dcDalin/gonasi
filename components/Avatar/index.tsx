import { Image } from 'expo-image';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { blurhash } from '@/components/GoIcon';
import { useAppSelector } from '@/store/store';

interface IAvatarProps {
  size: number;
  color: string;
}

export default function Avatar(props: IAvatarProps) {
  const { size = 22, color } = props;

  const { styles } = useStyles(stylesheet);

  const { profile } = useAppSelector((state) => state.profile);

  return (
    <>
      <Image
        source={{
          uri: profile.avatarUrl,
        }}
        contentFit="contain"
        accessibilityLabel="Avatar"
        style={styles.avatar(size, color)}
        placeholder={{ blurhash }}
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
