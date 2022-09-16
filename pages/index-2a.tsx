// fetching data on client side (useEffect) from a external api
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { getProducts, Product } from '../lib/products'

const HomePage: NextPage = () => {

  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    getProducts().then(setProducts)
  }, [])

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
