import { fetchJson } from "./api";
import { formatNumberToUSDCurrency } from "./format-number";

type Picture = {
  url: string,
}

export type RawProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  picture: Picture;
  created_at: string;
  updated_at: string;
};

export interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  picture: string;
}

const CMS_HOST = process.env.CMS_HOST

function stripProduct(product: RawProduct): Product {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    picture: CMS_HOST + product.picture.url,
    price: formatNumberToUSDCurrency(product.price),
  };
}

export async function getProduct(id = ""): Promise<Product> {
  const product = await fetchJson(`${CMS_HOST}/products/${id}`);
  return stripProduct(product);
}

export async function getProducts(): Promise<Product[]> {
  const products = await fetchJson(`${CMS_HOST}/products`);
  return products.map(stripProduct);
}
