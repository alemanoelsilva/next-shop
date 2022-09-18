import { useQuery } from "react-query";
import { fetchJson } from "../../lib/api";
import { CartItemsList } from "../../lib/cart-items";

const CART_ITEMS_QUERY_KEY = "cart-items";

interface ICartItems {
  cartItems: CartItemsList
  cartItemsIsLoading: boolean
}

export function useCartItems(): ICartItems {
  const query = useQuery<CartItemsList>(
    CART_ITEMS_QUERY_KEY,
    async () => {
      try {
        const cartItems: CartItemsList = await fetchJson("/api/cart");
        return cartItems;
      } catch (error) {
        return undefined;
      }
    },
    {
      cacheTime: Infinity,
      staleTime: 30_000, // in milliseconds
      refetchOnWindowFocus: false,
    }
  );

  return {
    cartItems: query.data,
    cartItemsIsLoading: query.isLoading,
  };
}
