import statusCode from "http-status"
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult, NextPage } from "next"
import Image from "next/image"
import AddToCartWidget from "../../components/AddToCartWidget"
import Page from "../../components/Page"
import { useUser } from "../../hooks/users"
import { ApiError } from "../../lib/api"
import { getProduct, getProducts, Product } from "../../lib/products"

type ContentPageProps = {
  product: Product,
}

type PageParams = {
  id: string,
}

export async function getStaticPaths(): Promise<GetStaticPathsResult<PageParams>> {
  const products = await getProducts()

  return {
    paths: products.map(product => ({
      params: { id: product.id.toString() },
    })),
    fallback: 'blocking', // request the page again, making the user wait until the render be done
  }
}

export async function getStaticProps({
  params
}: GetStaticPropsContext<PageParams>): Promise<GetStaticPropsResult<ContentPageProps>> {
  try {
    const product = await getProduct(params?.id)
    return {
      props: { product },
      revalidate: Number(process.env.REVALIDATE_IN_SECONDS),
    }
  } catch (error) {
    if (error instanceof ApiError && error.status === statusCode.NOT_FOUND) {
      return { notFound: true } // say to next js to render the 404 page
    }

    throw error
  }
}

const ProductPage: NextPage<ContentPageProps> = ({ product }) => {
  const user = useUser()

  return (
    <Page title={product.title}>
      <div className="flex flex-col lg:flex-row">
        <div>
          <Image src={product.picture} alt="" width={640} height={480} />
        </div>
        <div className="flex-1 lg:ml-4">
          <p className="text-sm">{product.description}</p>
          <p className="text-lg font-bold mt-2">{product.price}</p>
          {user && (<AddToCartWidget productId={product.id} />)}
        </div>
      </div>
    </Page>
  )
}

export default ProductPage