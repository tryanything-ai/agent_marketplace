import NextCors from "nextjs-cors";
import { NextApiRequest, NextApiResponse } from "next";
import { supabaseServer } from "@/utils/supabaseServer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await NextCors(req, res, {
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      origin: "*",
      optionsSuccessStatus: 200,
    });

    let { email } = req.body;

    console.log("email", email);

    // Check if email is valid
    const { data, error } = await supabaseServer
      .from("profiles")
      .select()
      .eq("email", email);

    if (error) {
      console.log("error", error);
      throw error;
    }

    // console.log("data", data);

    //TODO: this isn't really a real login
    //TODO: must use magic links and other things in prod
    //TODO: next-auth + magic links + ethos probably
    //THIS IS JUST A POC
    if (data && data[0] && data[0].ethos_blob) {
      console.log("ethos_blob", data[0].ethos_blob);
      res.json({ message: "Success" });
    } else {
      throw new Error("User Not Ready");
    }

    // Rest of the API logic
  } catch (err: any) {
    console.log("error", err);
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
