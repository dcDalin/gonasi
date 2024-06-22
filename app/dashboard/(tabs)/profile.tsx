import MobileContainer from '@/components/containers/MobileContainer';
import GoButton from '@/components/GoButton';
import GoText from '@/components/GoText';
import Avatar from '@/components/ProfileIcon/Avatar';
import { supabase } from '@/lib/supabase';
import { updateProfile } from '@/store/profileSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

export default function ProfileTabScreen() {
  const dispatch = useAppDispatch();

  const { session } = useAppSelector((state) => state.auth);
  const {
    profile: { avatarUrl, username, fullName },
  } = useAppSelector((state) => state.profile);

  return (
    <MobileContainer>
      <GoText text="Profile goes here" />
      <GoButton onPress={() => supabase.auth.signOut()} text="Logout" />
      <Avatar
        size={200}
        url={avatarUrl}
        onUpload={(url: string) => {
          dispatch(
            updateProfile({ session, username, fullName, avatarUrl: url })
          );
        }}
      />
    </MobileContainer>
  );
}
