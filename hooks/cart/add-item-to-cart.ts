import { useMutation } from "react-query";
import { fetchJson } from "../../lib/api";
import { HTTPMethod } from "http-method-enum";

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
  // react-query -> get
  // react-mutation -> post/put/patch/delete...
  const mutation = useMutation(({ productId, quantity }: AddItemToCart) =>
    fetchJson("/api/cart", {
      method: HTTPMethod.POST,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    })
  );

  return {
    addItemToCart: async (
      productId: number,
      quantity: number
    ): Promise<boolean> => {
      try {
        console.log("addItemToCart", productId, quantity);
        await mutation.mutateAsync({ productId, quantity });
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
