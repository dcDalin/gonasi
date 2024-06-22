import { useEffect } from 'react';
import { Image, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { getProfile } from '@/store/profileSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

export default function Avatar() {
  const { styles } = useStyles(stylesheet);
  const dispatch = useAppDispatch();

  const { session } = useAppSelector((state) => state.auth);
  const {
    status,
    profile: { avatarHref },
  } = useAppSelector((state) => state.profile);

  useEffect(() => {
    if (session) {
      dispatch(getProfile(session));
    }
  }, [dispatch, session]);

  return (
    <>
      {status === 'loading' ? (
        <View style={styles.wrapper}></View>
      ) : avatarHref ? (
        <Image
          source={{ uri: avatarHref }}
          accessibilityLabel="Avatar"
          style={styles.avatar}
        />
      ) : (
        <View style={styles.wrapper}></View>
      )}
    </>
  );
}

const stylesheet = createStyleSheet(({ size }) => ({
  wrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
  },
  avatar: {
    height: 28,
    width: 28,
    borderRadius: 14,
  },
}));
