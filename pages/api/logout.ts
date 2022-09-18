// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { fetchJson } from "../../lib/api";

const CMS_HOST = process.env.CMS_HOST;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  try {
    res
      .setHeader(
        "Set-Cookie",
        cookie.serialize("jwt", "", {
          path: "/api",
          expires: new Date(0),
        })
      )
      .status(200)
      .json({});
  } catch (error) {
    res.status(401).end();
  }
}
