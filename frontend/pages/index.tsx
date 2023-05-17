import Layout from "@/components/layout";

import { Database } from "../utils/database.types";
type Item = Database["public"]["Tables"]["items"]["Row"];
import { supabaseServer } from "../utils/supabaseServer";
import Carousel from "@/components/heroCarousel";

const Home = () => {
  return (
    <Layout>
      <div className="hero min-h-screen mt-10 md:mt-0">
        <div className="hero-content flex-col lg:flex-row max-w-2/3">
          {/* <img
            src="/images/stock/photo-1635805737707-575885ab0820.jpg"
            className="max-w-sm rounded-lg shadow-2xl"
          /> */}

          <div className="flex-1">
            <h1 className="text-5xl font-bold">
              Find and Install{" "}
              <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-purple-600">
                Unlisted
              </span>{" "}
              ChatGPT Plugins
            </h1>
            <p className="py-6">
              Plugins give ChatGPT{" "}
              <span className="underline">superpowers</span> but OpenAI won't
              list them all on their website. Use our chrome extension to
              install community created plugins that put ChatGPT in{" "}
              <span className="font-bold">God Mode</span>
            </p>
            <a
              href="https://airtable.com/shrhoQTKVTAYfwVI6"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Get Chrome Extension
            </a>
          </div>
          <div className="flex flex-1 w-full">
            <Carousel />
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
