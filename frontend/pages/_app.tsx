import { useState, useEffect } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { AppProps } from "next/app";
import "../styles/globals.css";
import SearchProvider from "@/context/searchContext";
import { EthosConnectProvider } from "ethos-connect";

import { useRouter } from "next/router";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react"; 

const ETHOS_API_KEY = process.env.NEXT_PUBLIC_ETHOS_API_KEY;

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "https://app.posthog.com",
    // Enable debug mode in development
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.debug();
    },
  });
}

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();

  useEffect(() => {
    // Track page views
    const handleRouteChange = () => posthog?.capture("$pageview");
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <PostHogProvider client={posthog}>
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <SearchProvider>
          <EthosConnectProvider
            ethosConfiguration={{
              apiKey: ETHOS_API_KEY, // Optional. Required for email signin. Please contact support@ethoswallet.xyz to acquire an API key.
              // chain: [CHAIN IDENTIFIER] // Optional. Defaults to sui:devnet - An enum containing acceptable chain identifier strings can be imported from the ethos-connect package
              // network: [RPC URL] // Optional. Defaults to https://fullnode.devnet.sui.io/
              // hideEmailSignIn: true // Optional.  Defaults to false
            }}
          >
            <Component {...pageProps} />
          </EthosConnectProvider>
        </SearchProvider>
      </SessionContextProvider>
    </PostHogProvider>
  );
}
export default MyApp;
