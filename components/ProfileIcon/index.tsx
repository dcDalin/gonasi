import { useEffect } from 'react';
import { View } from 'react-native';

import { getProfile } from '@/store/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

import GoText from '../GoText';

export default function ProfileIcon() {
  const dispatch = useAppDispatch();

  const { status, session, profile } = useAppSelector((state) => state.auth);

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
