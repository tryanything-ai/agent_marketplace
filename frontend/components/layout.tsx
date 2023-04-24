import Head from "next/head";
import { NextSeo } from "next-seo";
import Navbar from "./navbar";

const Layout = ({ children }: { children: any }) => {
  return (
    <div className="min-h-screen min-w-screen flex flex-col">
      <Head>
        <title>Anything</title>
        <meta content="ai agent marketplace" name="description" />
        {/* <link
          href="https://assets-global.website-files.com/6171b265e5c8aa59b42c3472/619bf6d5140958874014528c_favicon.png"
          rel="icon"
        /> */}
      </Head>
      <NextSeo
        title="Anything"
        openGraph={{
          title: "Anything",
          description: "ai agent marketplace",
          //TODO: add og image
          images: [
            {
              url: "https://qcuguzlfpjtyiloqtysz.supabase.co/storage/v1/object/public/random/ANYTHING.png",
              width: 1200,
              height: 630,
              alt: "Og Image Alt",
              type: "image/jpeg",
            },
          ],
          siteName: "Anything",
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />

      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="h-32 text-center">
        Bugs? Want to talk?{" "}
        <a className="underline" href="https://twitter.com/carllippert">
          dm Carl
        </a>
      </footer>
    </div>
  );
};
export default Layout;
