type RawProduct = {
  id: number,
  title: string,
  description: string,
  price: number,
  picture: any,
  created_at: string,
  updated_at: string,
}

export interface Product {
  id: number;
  title: string;
}

function stripProduct(product: RawProduct): Product {
  return ({
    id: product.id,
    title: product.title
  })
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch('http://localhost:1337/products')
  const products = await response.json()
  return products.map(stripProduct)
}