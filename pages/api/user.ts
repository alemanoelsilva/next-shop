// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchJson } from "../../lib/api";

const CMS_HOST = process.env.CMS_HOST;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  const { jwt } = req.cookies;

  if (!jwt) {
    res.status(401).end()
    return
  }

  try {
    const user = await fetchJson(`${CMS_HOST}/users/me`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    res.status(200).json({
      id: user.id,
      name: user.username,
    })
  } catch (error) {
    res.status(401).end()
  }
}
