import { NextApiRequest, NextApiResponse } from "next";
import { supabaseServer } from "../../utils/supabaseServer";
import { Database } from "../../utils/database.types";
type Agent = Database["public"]["Tables"]["items"]["Row"];
type InsertAgent = Database["public"]["Tables"]["items"]["Insert"];
import slugify from "slugify";

import { object, number, string, boolean, ObjectSchema } from "yup";

const insertAgentSchema = object({
  avatar_url: string().required(),
  // created_at: string().nullable(),
  description: string().required(),
  external_url: string().required(),
  // fake: boolean(),
  // id: number(),
  name: string().required(),
  price_description: string().nullable(),
  price: number().nullable(),
  slug: string().required(),
  // user_id: string().required(),
  creator_email: string().required(),
});

const createAgent = async ({
  avatar_url,
  description,
  external_url,
  name,
  price_description,
  price,
}: {
  avatar_url: string;
  description: string;
  external_url: string;
  name: string;
  price_description: string;
  price: string;
}): Promise<any | string> => {
  try {
    let slug = slugify(name, { lower: true });

    let { data, error } = await supabaseServer
      .from("agents")
      .insert({
        avatar_url,
        description,
        external_url,
        name,
        price_description,
        price,
        slug,
      })
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Agent | { error: string }>
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const {
    avatar_url,
    description,
    external_url,
    name,
    price_description,
    price,
    slug,
  }: InsertAgent = req.body;

  try {
    let obj: any = {
      avatar_url,
      description,
      external_url,
      name,
      price_description,
      price,
      slug,
    };

    await insertAgentSchema.validate(obj);
    // If validation passes, create the agent
    const agent = await createAgent(obj);
    res.status(201).json(agent);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}
