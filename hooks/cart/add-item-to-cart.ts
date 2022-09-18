import { useMutation, useQueryClient } from "react-query";
import { fetchJson } from "../../lib/api";

// const USER_QUERY_KEY = process.env.USER_QUERY_KEY || 'user';

type AddItemToCart = {
  productId: number;
  quantity: number;
};

interface IAddItemToCart {
  addItemToCart: Function;
  addItemToCartError: boolean;
  addItemToCartLoading: boolean;
}

export function useAddItemToCart(): IAddItemToCart {
  // const queryClient = useQueryClient();

  // react-query -> get
  // react-mutation -> post/put/patch/delete...
  const mutation = useMutation(({ productId, quantity }: AddItemToCart) =>
    fetchJson("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    })
  );

  return {
    addItemToCart: async (productId: number, quantity: number): Promise<boolean> => {
      try {
    console.log('addItemToCart', productId, quantity)
    await mutation.mutateAsync({ productId, quantity });
        // queryClient.setQueryData(USER_QUERY_KEY, user);
        return true;
      } catch (error) {
        // log error
        return false;
      }
    },
    addItemToCartError: mutation.isError,
    addItemToCartLoading: mutation.isLoading,
  };
}
