import Layout from "@/components/layout";
import Image from "next/image";
import { useEffect, useState} from "react";

import { Database } from "../utils/database.types";
type Item = Database["public"]["Tables"]["items"]["Row"];
import { supabaseServer } from "../utils/supabaseServer";
import Carousel from "@/components/heroCarousel";

const Home = () => {

  const [referrerDomain, setReferrerDomain] = useState<string>("");
	// Effect to run when the component mounts 
    useEffect(() => { 
      // Get the referrer URL 
      const referrerUrl = document.referrer; // Extract the domain from the URL 
      if (referrerUrl) {
        const url = new URL(referrerUrl);
        const domain = url.hostname; 
      // Update the state variable 
      setReferrerDomain(domain); } }, 
      []); 
  
  return (
    <Layout>
      <div className="hero min-h-screen mt-6">
        <div className="hero-content flex-col lg:flex-row max-w-2/3">
          {/* <img
            src="/images/stock/photo-1635805737707-575885ab0820.jpg"
            className="max-w-sm rounded-lg shadow-2xl"
          /> */}

          <div className="flex-1">
            <h1 className="text-5xl font-bold mt-10">
              The simplest way to build{" "}
              <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-purple-600">
                AI Automations
              </span>{" "}
              for your business.
            </h1>
            {/* <p className="py-6">
              Plugins give ChatGPT{" "}
              <span className="underline">superpowers</span>{" "}
              {`but OpenAI won't
              list them all on their website. Use our chrome extension to
              install community created plugins that put ChatGPT in`}{" "}
              <span className="font-bold">God Mode</span>
            </p> */}
            <p className="py-6" />
            <a
              href={`https://airtable.com/shrfQYBtcoUqYNylu?prefill_fldVLaD0gtTpY1jxP=wysiwyg&hide_fldVLaD0gtTpY1jxP=true&prefill_referring_domain=${referrerDomain}&hide_referring_domain=true`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Get Early Access
            </a>
            {/* <a
              href="https://airtable.com/shrnu7VEPLMTOD0XN?prefill_fldHbG1DXul2srMdo=unlisted"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary ml-2"
            >
              List Plugin
            </a> */}
          </div>
          <div className="flex flex-1 w-full lg:mt-0 mt-12">
            <div className="mockup-window border bg-secondary w-full">
              <div className="flex justify-center bg-base-200">
                <img
                  alt="wysiwg editor"
                  // width="100"
                  // height="100"
                  src="https://qcuguzlfpjtyiloqtysz.supabase.co/storage/v1/object/public/random/wysiwyg_big.png"
                />
              </div>
            </div>
            {/* <Carousel /> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

// export async function getStaticProps() {
//   try {
//     let { data: items, error } = await supabaseServer.from("items").select("*");
//     if (error) {
//       throw error;
//     }
//     return {
//       props: {
//         items,
//       },
//       revalidate: 1,
//     };
//   } catch (error) {
//     console.log("error", error);
//   }
// }

export default Home;
