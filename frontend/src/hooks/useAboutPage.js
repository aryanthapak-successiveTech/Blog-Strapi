import { GET_ABOUT } from "@/graphql/about/queries";
import { useQuery } from "@apollo/client/react";

export function useAboutpage() {
  const { data, loading, error } = useQuery(GET_ABOUT);

  return {
    aboutPage: data?.aboutPage || null,
    loading,
    error
  };
}