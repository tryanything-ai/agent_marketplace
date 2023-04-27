import { NextApiRequest, NextApiResponse } from "next";
import { supabaseServer } from "../../utils/supabaseServer";
import { Database } from "../../utils/database.types";
type Agent = Database["public"]["Tables"]["agents"]["Row"];

type PageInfo = {
  currentPage: number;
  perPage: number;
  pageCount: number;
  itemCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

type ApiResponse = {
  agents: Agent[];
  pageInfo: PageInfo;
};

const getAgents = async (page: number, size: number): Promise<ApiResponse> => {
  const offset = (page - 1) * size;

  const { data: agents, error: fetchError } = await supabaseServer
    .from("agents")
    .select("*")
    .range(offset, offset + size - 1);

  if (fetchError) {
    console.log("error", fetchError);
    throw fetchError;
  }

  const { count, error: countError } = await supabaseServer
    .from("agents")
    .select("*", { count: "exact", head: true });

  if (countError) {
    console.log("error", countError);
    throw countError;
  }

  const pageCount = Math.ceil(count! / size);

  const pageInfo: PageInfo = {
    currentPage: page,
    perPage: size,
    pageCount,
    itemCount: count!,
    hasPreviousPage: page > 1,
    hasNextPage: page < pageCount,
  };

  const response: ApiResponse = {
    agents: agents as Agent[],
    pageInfo,
  };

  return response;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | { error: string }>
) {
  const { page = 1, size = 10 } = req.query;

  console.log("page", page);
  console.log("size", size);

  try {
    const data = await getAgents(+page, +size);

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: JSON.stringify(error) });
  }
}
