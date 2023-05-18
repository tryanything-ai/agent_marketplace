import { NextApiRequest, NextApiResponse } from "next";
import { supabaseServer } from "../../../utils/supabaseServer";
import { Database } from "../../../utils/database.types";
type Agent = Database["public"]["Tables"]["items"]["Insert"];

type ApiResponse = {
  success: boolean;
};

const AIRTABLE_SECRET = process.env.AIRTABLE_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | { error: string }>
) {
  console.log("req.body", req.body);

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null || token != AIRTABLE_SECRET) return res.status(401);

  try {
    const { data, error } = await supabaseServer.from("items").upsert(
      {
        external_unique_id: req.body.airtable_id,
        name: req.body.name,
        description: req.body.description,
        avatar_url: req.body.avatar,
        url: req.body.url,
      },
      { ignoreDuplicates: false, onConflict: "external_unique_id" }
    );

    if (error) throw error;

    //get supabase item with this external_id
    const { data: item, error: itemError } = await supabaseServer
      .from("items")
      .select()
      .eq("external_unique_id", req.body.airtable_id);

    if (itemError) throw itemError;

    //delete tags that exist fo this item
    const { data: tags, error: tagsError } = await supabaseServer
      .from("item_tags")
      .delete()
      .eq("item_id", item[0].id);

    if (tagsError) throw tagsError;

    //write_new_tags
    const tagsArray = req.body.tags;

    let tagsInsertArray = [];

    for (let i = 0; i < tagsArray.length; i++) {
      //create insert array

      tagsInsertArray.push({
        item_id: item[0].id,
        tag_id: tagsArray[i],
      });
    }

    //insert tags
    const { data: tagsInsert, error: tagsInsertError } = await supabaseServer
      .from("item_tags")
      .insert(tagsInsertArray);

    if (tagsInsertError) throw tagsInsertError;

    res.json({ success: true });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: JSON.stringify(error) });
  }
}
