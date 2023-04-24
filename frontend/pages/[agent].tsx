import { useEffect, useState } from "react";
import { Spinner } from "../components/basic/spinner";
import { useRouter } from "next/router";

// import { supabaseServer } from "../utils/supabaseServer";
import { Database } from "../utils/database.types";
// import Head from "next/head";
import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";
import Layout from "@/components/layout";
import Container from "@/components/container";
type Agent = Database["public"]["Tables"]["agents"]["Row"];

const Agent = () => {
  //check for slug
  const router = useRouter();
  const slug = router.query.agent?.toString();
  const supabase = useSupabaseClient<Database>();

  const fetchAgent = async () => {
    const { data, error } = await supabase
      .from("agents")
      .select("*")
      .eq("slug", slug);

    if (error) {
      throw error;
    }

    if (data) {
      setAgent(data[0]);
    }
  };

  useEffect(() => {
    fetchAgent();
  }, []);

  const [agent, setAgent] = useState<Agent | null>(null);

  if (!slug) return <div>shit</div>;
  if (!agent)
    return (
      <Layout>
        <div className="pt-60 pl-60">
          <Spinner />
        </div>
      </Layout>
    );

  return (
    <Layout>
      <Container className="mt-32 pb-10">
        <div className="flex flex-col w-full border-opacity-50">
          <div className="h-40 card bg-base-300 rounded-box flex flex-row">
            <img
              className="rounded-full h-23 w-32 m-4"
              src={agent.avatar_url}
            />
            <div className="flex-col my-auto pl-10">
              <p className="text-5xl pb-2">{agent.name}</p>
              <p>{agent.description}</p>
            </div>
          </div>
          <div className="divider">Details</div>
          <div className="grid p-4 card bg-base-300 rounded-box">
            <div>Site: {agent.external_url}</div>
            <div>Reviews: Coming Soon</div>
            <div>Usage Trends: Coming Soon</div>
            <div>API: Coming Soon</div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

// export async function getStaticPaths() {
//   try {
//     //TODO: pagination
//     let paths: any = [];

//     let query = supabaseServer.from("agents").select(`*`);

//     const { data, error } = await query;

//     if (error) {
//       throw error;
//     }
//     if (data) {
//       console.log("DATA", data);

//       paths = data.map((agent: any) => {
//         return {
//           params: {
//             agent: agent.slug,
//           },
//         };
//       });
//     }
//     return {
//       paths,
//       fallback: true,
//     };
//   } catch (e) {
//     throw e;
//   }
// }

// export async function getStaticProps(context: any) {
//   try {
//     let project: Agent;

//     const { data, error } = await supabaseServer
//       .from("agents")
//       .select("*")
//       .eq("slug", context.params.agent)
//       .order("current_stars_count", {
//         foreignTable: "repositories",
//         ascending: false,
//       })
//       .single();

//     if (error) {
//       throw error;
//     }

//     project = data;
//     if (Array.isArray(data.accounts)) {
//       accounts = data.accounts;
//     }
//     if (Array.isArray(data.repositories)) {
//       repositories = data.repositories;
//     }

//     if (Array.isArray(data.chains)) {
//       chains = data.chains;
//     }

//     return {
//       props: {
//         project,
//         accounts,
//         repositories,
//         chains,
//       },
//     };
//   } catch (e) {
//     console.log(e);
//   }
// }

export default Agent;
