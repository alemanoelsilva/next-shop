import { formatNumberToUSDCurrency } from "./format-number";
import { RawProduct } from "./products";

type RawCartItems = {
  id: number;
  product: RawProduct;
  user: any,
  quantity: number;
  total: number;
};

export type CartItems = {
  id: number;
  product: {
    id: number;
    title: string;
    price: number;
  };
  quantity: number;
  total: number;
};

export type CartItemsList = CartItems[] | undefined;

export function calculateCartItemTotal(cartItems: CartItems[]): string {
  const total = cartItems.reduce((acc, currentItem) =>  acc + currentItem.total ,0)
  console.log('total', total)
  return formatNumberToUSDCurrency(total)
}

function stripCartItems(cartItem: RawCartItems): CartItems {
  const price = (cartItem.product.price || 1)
  const total = cartItem.quantity * price;

  return {
    id: cartItem.id,
    quantity: cartItem.quantity,
    total,
    product: {
      id: cartItem.product.id,
      title: cartItem.product.title,
      price,
    },
  };
}

export default stripCartItems;
