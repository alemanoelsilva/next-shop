// fetching data on client side (useEffect) from a internal api
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { getProducts, Product } from '../lib/products'

const HomePage: NextPage = () => {

  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/products')
      const products = await response.json()
      setProducts(products)
    })()
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
