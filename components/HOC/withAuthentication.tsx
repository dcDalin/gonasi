import { type FC, useEffect, useState } from 'react';

import FullPageLoader from '@/components/loaders/FullPageLoader';
import { supabase } from '@/lib/supabase';
import { updateUserSession } from '@/store/authSlice';
import { getProfile } from '@/store/profileSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

type withAuthenticationFn = (Component: FC) => FC;

const withAuthentication: withAuthenticationFn = (Component) => {
  const Authenticated: FC = (props): JSX.Element | null => {
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(true);
    const { status } = useAppSelector((state) => state.auth);
    const { status: profileStatus } = useAppSelector((state) => state.profile);

    useEffect(() => {
      setLoading(true);

      supabase.auth.getSession().then(({ data: { session } }) => {
        dispatch(updateUserSession(session));
        dispatch(getProfile(session));
        setLoading(false);
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        dispatch(updateUserSession(session));
        dispatch(getProfile(session));
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    }, [dispatch]);

    if (loading || status === 'loading' || profileStatus === 'loading') {
      return <FullPageLoader />;
    }

    return <Component {...props} />;
  };

  return Authenticated;
};

export default withAuthentication;
