import { useEffect, useState } from "react";
import Layout from "@/components/layout";

import { Database } from "../utils/database.types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
// import PopUpForm from "@/components/popupForm";
import Container from "@/components/container";
import Link from "next/link";
type Agent = Database["public"]["Tables"]["agents"]["Row"];

const Agents = () => {
  const [agents, setAgents] = useState<Agent[] | null>();
  const [loading, setLoading] = useState(false);
  const supabase = useSupabaseClient<Database>();

  const fetchAgents = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase.from("agents").select();

      if (error) {
        throw error;
      }

      setAgents(data);
      console.log("Agents", data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <Layout>
      {/* <PopUpForm /> */}
      <Container className="mt-32 pb-10">
        <div>
          <h1 className="text-5xl">Browse Agents</h1>
        </div>
        <div className="mt-28">
          {agents?.map((agent: Agent) => {
            return (
              <Link
                key={agent.id}
                href={`/${agent.slug}`}
                className="h-20 bg-base-300 border border-1 rounded-md mb-3 flex flex-row"
              >
                <img
                  className="rounded-full h-14 w-14 m-2 ml-5"
                  src={agent.avatar_url}
                  alt="agent.name"
                />
                <div className="text-4xl mt-4 ml-3 truncate">{agent.name}</div>
              </Link>
            );
          })}
        </div>
      </Container>
    </Layout>
  );
};

export default Agents;
