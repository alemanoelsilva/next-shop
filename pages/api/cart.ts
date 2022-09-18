// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchJson } from "../../lib/api";
import stripCartItems, { CartItems } from "../../lib/cart-items";

const CMS_HOST = process.env.CMS_HOST;

async function handlerGetCart(
  req: NextApiRequest,
  res: NextApiResponse<CartItems[]>
) {
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
}

async function handlerPostCart(req: NextApiRequest, res: NextApiResponse) {
  const { jwt } = req.cookies;

  if (!jwt) {
    res.status(401).end();
    return;
  }

  const {productId, quantity} = req.body

  try {
    await fetchJson(`${CMS_HOST}/cart-items`, {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${jwt}` ,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product: productId, quantity
      })
    });

    res.status(200).json({});
  } catch (error) {
    res.status(401).end();
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return handlerGetCart(req, res);
    case "POST":
      return handlerPostCart(req, res);
    default:
      return res.status(405).end();
  }
}
