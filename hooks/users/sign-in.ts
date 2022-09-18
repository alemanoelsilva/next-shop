import { useMutation, useQueryClient } from "react-query";
import { fetchJson } from "../../lib/api";

const USER_QUERY_KEY = process.env.USER_QUERY_KEY || 'user';

type EmailSignIn = {
  email: string;
  password: string;
};

interface IEmailSignIn {
  signIn: Function;
  signInError: boolean;
  signInLoading: boolean;
}

export function useEmailSignIn(): IEmailSignIn {
  const queryClient = useQueryClient();

  // react-query -> get
  // react-mutation -> post/put/patch/delete...
  const mutation = useMutation(({ email, password }: EmailSignIn) =>
    fetchJson("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
  );

  return {
    signIn: async (email: string, password: string): Promise<boolean> => {
      try {
        const user = await mutation.mutateAsync({ email, password });
        queryClient.setQueryData(USER_QUERY_KEY, user);
        return true;
      } catch (error) {
        // log error
        return false;
      }
    },
    signInError: mutation.isError,
    signInLoading: mutation.isLoading,
  };
}
