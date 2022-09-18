import { MouseEventHandler } from "react";
import { useMutation, useQueryClient } from "react-query";
import { fetchJson } from "../../lib/api";

const USER_QUERY_KEY = process.env.USER_QUERY_KEY || 'user';

interface IEmailSignOut {
  signOut: MouseEventHandler<HTMLButtonElement>;
}

export function useSignOut(): IEmailSignOut {
  const queryClient = useQueryClient();

  const mutation = useMutation(() => fetchJson("/api/logout"));

  return {
    signOut: async (): Promise<any> => {
      try {
        await mutation.mutateAsync();
        queryClient.setQueryData(USER_QUERY_KEY, undefined);
      } catch (error) {
        // log error
        return undefined;
      }
    },
  };
}
