// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { fetchJson } from "../../lib/api";
import { User } from "../../lib/user";
import { HTTPMethod } from "http-method-enum";

const CMS_HOST = process.env.CMS_HOST;

const handler: NextApiHandler<User> = async (
  req: NextApiRequest,
  res: NextApiResponse<User>
) => {
  if (req.method !== HTTPMethod.POST) {
    res.status(405).end();
    return;
  }

  const { email, password } = req.body;

  try {
    const { jwt, user } = await fetchJson(`${CMS_HOST}/auth/local`, {
      method: HTTPMethod.POST,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: email, password }),
    });

    res
      .setHeader(
        "Set-Cookie",
        cookie.serialize("jwt", jwt, {
          path: "/api",
          httpOnly: true,
        })
      )
      .status(200)
      .json({
        id: user.id,
        name: user.username,
      });
  } catch (error) {
    res.status(401).end();
  }
};

export default handler;
