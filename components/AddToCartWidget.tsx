import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAddItemToCart } from "../hooks/cart/add-item-to-cart";
import Button from "./Button";

type ContentProps = {
  productId: number
}

const AddToCartWidget: React.FC<ContentProps> = ({ productId }) => {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const { addItemToCart, addItemToCartLoading } = useAddItemToCart()

  const handleClick = async () => {
    console.log('AddToCartWidget', productId, quantity)

    const productAddSuccessfully = await addItemToCart(productId, quantity)
    if (productAddSuccessfully) {
      router.push('/cart')
    }
  }

  return (
    <div className="py-2">
      <input
        type='number'
        min='1'
        className="border rounded px-3 py-1 mr-2 w-16 text-right"
        value={quantity.toString()}
        onChange={(event) => setQuantity(Number(event.target.value))}
      />

      {addItemToCartLoading ? (
        <p>Loading...</p>
      ) : (
        <Button clickHandler={handleClick}>
          Add to cart
        </Button>
      )}
    </div>
  );
};

export default AddToCartWidget;