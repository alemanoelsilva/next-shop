import { NextPage } from "next"
import CartTable from "../../components/CartTable"
import Page from "../../components/Page"
import { useCartItems } from "../../hooks/cart"

const CartPage: NextPage = ({ }) => {
  const { cartItems, cartItemsIsLoading } = useCartItems()

  if (cartItemsIsLoading) {
    return (<p>Loading...</p>)
  }

  return (
    <Page title="Cart">
      {cartItems && (<CartTable cartItems={cartItems} />)}
    </Page>
  )
}

export default CartPage