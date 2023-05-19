import React, { useState, useEffect } from 'react';

import { Session } from '@supabase/supabase-js';
import { supabase } from '../../../../utils/supabase';

import Auth from './auth';
import { Marketplace } from './marketplace';

export const App = ({ count, pages, listings, page }: any) => {
  const [session, setSession] = useState<Session | null>(null);

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
    return (
      <Marketplace
        count={count}
        pages={pages}
        page={page}
        listings={listings}
      />
    );
  }
};
