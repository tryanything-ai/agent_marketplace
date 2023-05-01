import NextCors from "nextjs-cors";
import { NextApiRequest, NextApiResponse } from "next";

const ETHOS_API_KEY = process.env.ETHOS_PRIVATE_API_KEY;

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

    let root_url = "https://api.ethoswallet.xyz/api/v1";

    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    if (ETHOS_API_KEY) {
      headers.set("Authorization", `Bearer ${ETHOS_API_KEY}`);
    }
    //TODO: save to supabase
    //

    let body: { external_id: string; name?: string } = {
      external_id: "string",
      name: "string",
    };

    //call api with api key as authorization header
    const response = await fetch(root_url + "/accounts", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    // Rest of the API logic
    res.json({ message: "Hello NextJs Cors!" });
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
