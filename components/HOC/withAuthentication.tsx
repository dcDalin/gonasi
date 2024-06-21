import { Redirect } from 'expo-router';
import { type FC, useEffect, useState } from 'react';

import FullPageLoader from '@/components/loaders/FullPageLoader';
import { supabase } from '@/lib/supabase';
import { updateUserSession } from '@/store/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

type withAuthenticationFn = (Component: FC) => FC;

const withAuthentication: withAuthenticationFn = (Component) => {
  const Authenticated: FC = (props): JSX.Element | null => {
    const dispatch = useAppDispatch();
    const { isLoggedIn } = useAppSelector((state) => state.auth);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(true);

      supabase.auth.getSession().then(({ data: { session } }) => {
        dispatch(updateUserSession(session));
        setLoading(false);
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        dispatch(updateUserSession(session));
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    }, [dispatch, isLoggedIn]);

    if (loading) {
      return <FullPageLoader />;
    }

    return <Component {...props} />;
  };

  return Authenticated;
};

export default withAuthentication;
