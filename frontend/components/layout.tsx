import Head from "next/head";
import { NextSeo } from "next-seo";
import Navbar from "./navbar";
import Link from "next/link";

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
          description: "AI Automation",
          images: [
            {
              url: "https://qcuguzlfpjtyiloqtysz.supabase.co/storage/v1/object/public/random/anything-wysiwyg.png",
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
      <footer className="footer p-10 bg-base-300 text-base-content">
        <div>
          <span className="footer-title">Open Source</span>
          <Link href="/os-plugins" className="link link-hover">
            All Open Source Plugins
          </Link>
          <Link href="/experiments/agent_pay" className="link link-hover">
            Agent To Agent Payments
          </Link>
          <Link href="/experiments/extension" className="link link-hover">
            ChatGPT Plugin Store Extension
          </Link>
          {/* <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a> */}
        </div>
        <div>
          <span className="footer-title">Anything</span>
          <a
            href="https://github.com/orgs/anything-protocol/repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover"
          >
            Github
          </a>
          <a
            href="https://twitter.com/carllippert"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover"
          >
            Contact
          </a>
          {/* <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a> */}
        </div>
        {/* <div>
          <span className="footer-title">Social</span>
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </div> */}
      </footer>
    </div>
  );
};
export default Layout;
