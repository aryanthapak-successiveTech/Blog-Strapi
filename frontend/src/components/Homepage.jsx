"use client";

import React from "react";
import { useHomepage } from "@/hooks/useHomepage";
import { useBlogs } from "@/hooks/useBlogs";
import { BASE_URL } from "@/utils/Constants";
import Image from "next/image";

export default function Home() {
  const { homepage, loading: homeLoading, error: homeError } = useHomepage();
  const { blogs, loading: blogsLoading, error: blogsError } = useBlogs();
  if (homeLoading || blogsLoading) return <p>Loading...</p>;
  if (homeError || blogsError) return <p>Something went wrong!</p>;

  return (
    <main className="min-h-screen bg-white text-gray-900">

      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {homepage?.hero?.title ?? "Welcome to My Blog App"}
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          {homepage?.hero?.subtitle ??
            "Read and share ideas, insights, and inspiration."}
        </p>
        {homepage?.hero?.heroImage?.url && (
          <img
            src={`${BASE_URL}${homepage.hero.heroImage.url}`}
            alt={homepage.hero.title}
            className="mx-auto mt-6 rounded-lg shadow-lg max-h-96 object-cover"
          />
        )}
        {homepage?.hero?.ctaText && (
          <a
            href={homepage.hero.ctaLink ?? "#"}
            className="mt-8 inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100"
          >
            {homepage.hero.ctaText}
          </a>
        )}
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-semibold mb-6">Latest Blogs</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog.documentId}
              className="bg-white shadow-md rounded-lg p-6 border hover:shadow-lg transition"
            >
              {blog.blogImage?.url && (
                <Image
                  width={400}
                  height={200}
                  alt={blog.title}
                  className="w-full h-48 object-cover mb-4 rounded"
                  src={`${BASE_URL}${blog.blogImage.url}`}/>)}
              <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
              <p className="text-gray-700 line-clamp-3">{blog.article}</p>
              <p className="text-sm text-gray-500 mt-4">
                Posted on {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center py-6 text-sm text-gray-500 border-t">
        <p>{homepage?.footer?.footerText}</p>
      </footer>
    </main>
  );
}
