import React, { useState, useEffect } from 'react';

import { Session } from '@supabase/supabase-js';
import { supabase } from '../../../../utils/supabase';
// @ts-ignore
import secrets from 'secrets';

import Auth from './auth';
import { Marketplace } from './marketplace';

// analytics
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== 'undefined') {
  if (
    !window.location.host.includes('127.0.0.1') &&
    !window.location.host.includes('localhost')
  ) {
    posthog.init(secrets.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: 'https://app.posthog.com',
      // Enable debug mode in development
      // loaded: (posthog) => {
      //   if (process.env.NODE_ENV === 'development') posthog.debug();
      // },
    });
  }
}

export const App = ({ count, pages, listings, page }: any) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      posthog.identify(session?.user?.email);
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <PostHogProvider client={posthog}>
      {!session ? (
        <Auth />
      ) : (
        <Marketplace
          count={count}
          pages={pages}
          page={page}
          listings={listings}
        />
      )}
    </PostHogProvider>
  );
};
