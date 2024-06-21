import { useEffect } from 'react';
import { View } from 'react-native';

import { getProfile } from '@/store/profileSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

import GoText from '../GoText';

export default function ProfileIcon() {
  const dispatch = useAppDispatch();

  const { session } = useAppSelector((state) => state.auth);
  const { status, profile } = useAppSelector((state) => state.profile);

  useEffect(() => {
    if (session) {
      dispatch(getProfile(session));
    }
  }, [dispatch, session]);

  return (
    <View>
      <GoText text={status === 'loading' ? 'Loading...' : profile?.username} />
    </View>
  );
}
