// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { fetchJson } from "../../lib/api";
import stripCartItems, { CartItems } from "../../lib/cart-items";
import { HTTPMethod } from "http-method-enum";

const CMS_HOST = process.env.CMS_HOST;

const handlerGetCart: NextApiHandler<CartItems[]> = async (
  req: NextApiRequest,
  res: NextApiResponse<CartItems[]>
) => {
  const { jwt } = req.cookies;

  if (!jwt) {
    res.status(401).end();
    return;
  }

  try {
    const items = await fetchJson(`${CMS_HOST}/cart-items`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    res.status(200).json(items.map(stripCartItems));
  } catch (error) {
    res.status(401).end();
  }
};

const handlerPostCart: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { jwt } = req.cookies;

  if (!jwt) {
    res.status(401).end();
    return;
  }

  const { productId, quantity } = req.body;

  try {
    await fetchJson(`${CMS_HOST}/cart-items`, {
      method: HTTPMethod.POST,
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: productId,
        quantity,
      }),
    });

    res.status(200).json({});
  } catch (error) {
    res.status(401).end();
  }
};

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case HTTPMethod.GET:
      return handlerGetCart(req, res);
    case HTTPMethod.POST:
      return handlerPostCart(req, res);
    default:
      return res.status(405).end();
  }
};

export default handler;
