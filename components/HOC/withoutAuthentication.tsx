import { Session } from '@supabase/supabase-js';
import { Redirect } from 'expo-router';
import { type FC, useEffect, useState } from 'react';

import FullPageLoader from '@/components/loaders/FullPageLoader';
import { supabase } from '@/lib/supabase';

type withoutAuthenticationFn = (Component: FC) => FC;

const withoutAuthentication: withoutAuthenticationFn = (Component) => {
  const NotAuthenticated: FC = (props): JSX.Element | null => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(true);

      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setLoading(false);
      });

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setLoading(false);
      });
    }, []);

    if (loading) {
      return <FullPageLoader />;
    }

    if (session) {
      return <Redirect href="/dashboard/(tabs)" />;
    }

    return <Component {...props} />;
  };

  return NotAuthenticated;
};

export default withoutAuthentication;
