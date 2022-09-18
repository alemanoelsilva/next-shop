import type { GetStaticPropsResult, NextPage } from 'next'
import Page from '../components/Page';
import ProductCard from '../components/ProductCard';
import { getProducts, Product } from '../lib/products';

type ContentPageProps = {
  products: Product[]
}

export async function getStaticProps(): Promise<GetStaticPropsResult<ContentPageProps>> {
  const products = await getProducts()
  return {
    props: { products },
    revalidate: Number(process.env.REVALIDATE_IN_SECONDS),
  }
}

const HomePage: NextPage<ContentPageProps> = ({ products }) => {
  return (
    <Page title="Indoor Plants">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
        {products.map(product => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </Page>
  )
}

export default HomePage
