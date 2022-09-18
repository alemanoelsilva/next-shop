import { useQuery } from "react-query";
import { fetchJson } from "../../lib/api";

const USER_QUERY_KEY = process.env.USER_QUERY_KEY || 'user';

type User = {
  id: number;
  name: string;
};

export function useUser(): User | undefined {
  // https://react-query-v3.tanstack.com/reference/useQuery#_top
  const query = useQuery<User | undefined>(
    USER_QUERY_KEY,
    async () => {
      try {
        return (await fetchJson("/api/user")) as User;
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

  return query.data;
}