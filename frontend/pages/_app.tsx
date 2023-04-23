import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { AppProps } from "next/app";
import "../styles/globals.css";
import SearchProvider from "@/context/searchContext";
import { EthosConnectProvider } from "ethos-connect";

const ETHOS_API_KEY = process.env.NEXT_PUBLIC_ETHOS_API_KEY;

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
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
  );
}
export default MyApp;
