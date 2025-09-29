import { useQuery } from "@apollo/client/react";
import { GET_BLOGS } from "@/graphql/blogs/queries";

export function useBlogs() {
  const { data, loading, error } = useQuery(GET_BLOGS);
  return {
    blogs: data?.blogs || [],
    loading,
    error
  };
}