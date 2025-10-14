"use client";
import { useState } from "react";
import { useLazyQuery } from "@apollo/client/react";
import { GET_BLOG_PAGINATED } from "@/graphql/blogs/queries";
import Link from "next/link";
import Image from "next/image";
import { BASE_URL } from "@/utils/Constants";

const limit = 4;

export default function BlogsPageClient({ initialBlogs, initialPageInfo }) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [pageInfo, setPageInfo] = useState(initialPageInfo);
  const [loading, setLoading] = useState(false);

  const [fetchBlogs] = useLazyQuery(GET_BLOG_PAGINATED,{
    fetchPolicy:"cache-and-network"
  });

  const handleLoadMore = async () => {
    setLoading(true);
    const { data } = await fetchBlogs({
      variables: { cursor: pageInfo.nextCursor, limit },
    });
    setBlogs((prev) => [...prev, ...data.blogsPaginated.data]);
    setPageInfo(data.blogsPaginated.pageInfo);
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
      {blogs.map((blog) => (
        <Link
          key={blog.documentId}
          href={`/blogs/${blog.documentId}`}
          className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition block w-full max-w-xl mb-4"
        >
          <div className="relative h-56 w-full">
            <Image
              src={`${BASE_URL}${blog.blogImage?.url}`}
              alt={blog.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="p-5">
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            Published:{" "}
            {new Intl.DateTimeFormat("en-US").format(
              new Date(blog.publishedAt)
            )}
          </div>
        </Link>
      ))}

      {pageInfo?.hasNextPage && (
        <div className="col-span-full flex justify-center mt-4">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
