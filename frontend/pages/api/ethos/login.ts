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

    let root_url = "https://api.ethoswallet.xyz/";

    // Rest of the API logic
    res.json({ message: "Hello NextJs Cors!" });
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
