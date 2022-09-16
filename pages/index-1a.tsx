// fetching data on server side (getStaticProps)
import type { GetStaticPropsResult, NextPage } from 'next'
import Head from 'next/head'
import { getProducts, Product } from '../lib/products';

interface Props {
  products: Product[]
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const products = await getProducts()
  return {
    props: { products }
  }
}

const HomePage: NextPage<Props> = ({ products }) => {
  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className="px-6 py-4">
        <h1 className="text-xl font-bold">Next Shop</h1>

        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.id} | {product.title}
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default HomePage
