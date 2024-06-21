import { Session } from '@supabase/supabase-js';
import { Redirect } from 'expo-router';
import { type FC, useEffect, useState } from 'react';

import FullPageLoader from '@/components/loaders/FullPageLoader';
import { supabase } from '@/lib/supabase';

type withAuthenticationFn = (Component: FC) => FC;

const withAuthentication: withAuthenticationFn = (Component) => {
  const Authenticated: FC = (props): JSX.Element | null => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(true);

      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setLoading(false);
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    }, []);

    if (loading) {
      return <FullPageLoader />;
    }

    if (!session) {
      return <Redirect href="/" />;
    }

    return <Component {...props} />;
  };

  return Authenticated;
};

export default withAuthentication;
