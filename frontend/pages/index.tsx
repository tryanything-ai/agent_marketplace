import Layout from "@/components/layout";
import Search from "@/components/search";
import Link from "next/link";
import { Database } from "../utils/database.types";
type Item = Database["public"]["Tables"]["items"]["Row"];
import { supabaseServer } from "../utils/supabaseServer";

const Home = ({ items }: { items: Item[] }) => {
  return (
    <Layout>
      <div className="hero pt-32 pb-20">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold pb-10 text-white">
              <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-purple-600">
                All
              </span>{" "}
              <span className="">
                the <span className="bold">Open Source</span> AI plugins on
                Earth
              </span>
              {/* <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-purple-600">
                Earth
              </span> */}
            </h1>
            <h3>Obviously we use AI to keep it up to date too.</h3>
            <div className="flex flex-col mt-5">
              {/* https://github.com/anything-protocol/agent_marketplace */}
              {/* <Link className="btn" href="/agents">
                Browse Agents 👉
              </Link> */}
              {/* <a
                className="btn"
                href="https://github.com/anything-protocol/agent_marketplace"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Us On Github 👉
              </a> */}
              {/* )} */}
              {/* <div className="text-xl text-white mb-6">
                {" "}
                The AI Agent Markteplace.
              </div> */}
              <a
                href="https://airtable.com/shrcQpAnCyClXXFKd" //plugin updates
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary mt-2"
              >
                Get Updates on New Plugins
              </a>
            </div>

            {/* <Search className="w-full" mobile={false} /> */}
          </div>
        </div>
      </div>
      <div className="max-w-xl mx-auto">
        {items.map((item: Item, index: number) => {
          // console.log("item", index);
          return (
            <div
              key={item.id}
              className="h-32 bg-base-300 p-2 border border-1 rounded-md mb-3 flex flex-row"
            >
              <img
                className="rounded-full h-14 w-14 m-2 ml-5 border border-1"
                src={item.avatar_url!}
                alt="item.name"
              />
              <div className="flex flex-col">
                <a
                  href={item.external_unique_id!}
                  className="link text-2xl mt-4 ml-3 truncate"
                >
                  {item.name}
                </a>
                <div className="mt-4 ml-3">{item.description}</div>
              </div>
            </div>
          );
        })}
      </div>
      {/* <h3 className="pt-32">Think of it like NPM for AI Agents</h3> */}
    </Layout>
  );
};

export async function getStaticProps() {
  try {
    let { data: items, error } = await supabaseServer.from("items").select("*");

    if (error) {
      throw error;
    }

    return {
      props: {
        items,
      },
      revalidate: 1,
    };
  } catch (error) {
    console.log("error", error);
  }
}

export default Home;
