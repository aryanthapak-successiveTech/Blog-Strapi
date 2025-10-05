"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_BLOG_PAGINATED } from "@/graphql/blogs/queries";
import { BASE_URL } from "@/utils/Constants";
import Image from "next/image";
import Link from "next/link";

export default function BlogsPage() {
  const [cursor, setCursor] = useState(null);
  const limit = 4;

  const { data, loading, error, fetchMore } = useQuery(GET_BLOG_PAGINATED, {
    variables: { cursor, limit },
    fetchPolicy: "cache-and-network",
  });

  if (loading && !data) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;

  const blogs = data?.blogsPaginated?.data || [];
  const pageInfo = data?.blogsPaginated?.pageInfo;

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Latest Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <Link
            key={blog.documentId}
            href={`/blogs/${blog.documentId}`}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition block"
          >
            {blog.blogImage?.url ? (
              <div className="relative h-56 w-full">
                <Image
                  src={`${BASE_URL}${blog.blogImage.url}`}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="relative h-56 w-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-500 text-sm">
                Published: {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {pageInfo?.hasNextPage && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() =>
              fetchMore({
                variables: { cursor: pageInfo.nextCursor, limit },
                updateQuery: (prev, { fetchMoreResult }) => ({
                  blogsPaginated: {
                    __typename: prev.blogsPaginated.__typename,
                    data: [
                      ...prev.blogsPaginated.data,
                      ...fetchMoreResult.blogsPaginated.data,
                    ],
                    pageInfo: fetchMoreResult.blogsPaginated.pageInfo,
                  },
                }),
              })
            }
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      )}
    </main>
  );
}
