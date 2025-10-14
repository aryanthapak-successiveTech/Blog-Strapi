import React from "react";
import { BASE_URL } from "@/utils/Constants";
import { getClient } from "@/lib/apolloClient";
import { GET_BLOGS } from "@/graphql/blogs/queries";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

export default async function BlogSection({blogs}) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-semibold mb-6">Latest Blogs</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Link href={`blogs/${blog.documentId}`} key={blog.documentId}>
            <div className="bg-white shadow-md rounded-lg p-6 border hover:shadow-lg transition">
              {blog.blogImage?.url && (
                <Image
                  width={400}
                  height={200}
                  alt={blog.title}
                  className="w-full h-48 object-cover mb-4 rounded"
                  src={`${BASE_URL}${blog.blogImage.url}`}
                  priority={false}
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              )}
              <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
              <p className="text-gray-700 line-clamp-3">{blog.article}</p>
              <p className="text-sm text-gray-500 mt-4">
                Posted on {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
