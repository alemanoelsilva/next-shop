import React from "react";
import { calculateCartItemTotal, CartItems } from "../lib/cart-items";
import { formatNumberToUSDCurrency } from "../lib/format-number";

type ContentProps = {
  cartItems: CartItems[]
}

const CartTable: React.FC<ContentProps> = ({ cartItems }) => {
  return (
    <table>
      <thead>
        <tr>
          <th className="px-4 py-2">Product</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2">Quantity</th>
          <th className="px-4 py-2">Total</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map(item => (
          <tr key={item.id}>
            <td className="px-4 py-2">{item.product.title}</td>
            <td className="px-4 py-2 text-right">{item.product.price}</td>
            <td className="px-4 py-2 text-right">{item.quantity}</td>
            <td className="px-4 py-2 text-right">{formatNumberToUSDCurrency(item.total)}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th className="px-4 py-2 text-left">Total</th>
          <th></th>
          <th></th>
          <th className="px-4 py-2 text-right">
            {calculateCartItemTotal(cartItems)}
          </th>
        </tr>
      </tfoot>
    </table>
  );
};

export default CartTable;