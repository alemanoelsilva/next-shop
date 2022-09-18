// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<{}>
) => {
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

export default handler