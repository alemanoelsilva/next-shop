import type { NextPage } from 'next'
import Head from 'next/head'

const products = [
  { id: 1, title: 'first'},
  { id: 2, title: 'second'},
  { id: 3, title: 'third'},
]

const HomePage: NextPage = () => {
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
              {product.title}
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default HomePage
