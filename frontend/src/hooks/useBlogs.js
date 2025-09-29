import { useQuery } from "@apollo/client/react";
import { GET_BLOGS } from "@/graphql/blogs/queries";

export function useBlogs({ pagination,sort="" }) {
  const { data, loading, error } = useQuery(GET_BLOGS, {
    variables: { pagination,sort },
    fetchPolicy: "network-only",
  });

  return {
    blogs: data?.blogs_connection?.nodes || [],
    pageInfo: data?.blogs_connection?.pageInfo || {},
    loading,
    error,
  };
}
