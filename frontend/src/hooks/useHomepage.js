import { useQuery } from "@apollo/client/react";
import { GET_HOMEPAGE } from "@/graphql/homepage/queries";

export function useHomepage() {
  const { data, loading, error } = useQuery(GET_HOMEPAGE);
  return {
    homepage: data?.homepage || null,
    loading,
    error
  };
}