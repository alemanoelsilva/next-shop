import Image from "next/image"
import Link from "next/link"
import React from "react"
import { Product } from "../lib/products"

type ContentProps = {
  product: Product
}

const ProductCard: React.FC<ContentProps> = ({ product }) => {
  return (
    <div className="border w-80 shadow hover:shadow-xl">
      <Link href={`/products/${product.id}`}>
        <a>
          <Image src={product.picture} alt="" width={320} height={240}/>
          <div className="p-2 flex justify-between items-baseline">
            <h2 className="text-lg font-bold">
              {product.title}
            </h2>
            <span>
              {product.price}
            </span>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default ProductCard