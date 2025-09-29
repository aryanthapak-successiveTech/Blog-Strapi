"use client";

import { useQuery } from "@apollo/client/react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { BASE_URL } from "@/utils/Constants";
import { GET_BLOG } from "@/graphql/blogs/queries";
import CommentSection from "@/components/CommentSection";

export default function BlogPage() {
  const { blogId } = useParams();

  const { loading, error, data } = useQuery(GET_BLOG, {
    variables: { documentId: blogId },
  });

  if (loading) return <p className="p-4">Loading blog...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const blog = data?.blog;

  if (!blog) {
    return <p className="p-4">Blog not found.</p>;
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      {blog.postedBy && (
        <p className="text-gray-600 mb-2">By {blog.postedBy.username}</p>
      )}
      <p className="text-gray-500 text-sm mb-6">
        Published: {new Date(blog.publishedAt).toLocaleDateString()}
      </p>
      {blog.blogImage?.url && (
        <div className="mb-6">
          <Image
            src={`${BASE_URL}${blog.blogImage.url}`}
            alt={blog.title}
            width={800}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>
      )}
      <div className="prose max-w-none">
        <p>{blog.article}</p>
      </div>
              <CommentSection/>
    </article>
  );
}