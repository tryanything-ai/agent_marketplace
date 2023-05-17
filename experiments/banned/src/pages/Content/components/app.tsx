import React, { useState, useEffect } from 'react';

import { Session } from '@supabase/supabase-js';
import { supabase } from '../../../../utils/supabase';

import Auth from './auth';
import { Marketplace } from './marketplace';

export const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <Auth />;
  } else {
    return <Marketplace />;
  }
};
