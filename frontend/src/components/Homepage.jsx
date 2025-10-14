import React from "react";
import { BASE_URL } from "@/utils/Constants";
import Image from "next/image";
import { getClient } from "@/lib/apolloClient";
import { GET_HOMEPAGE } from "@/graphql/homepage/queries";
import { GET_BLOGS } from "@/graphql/blogs/queries";
import Link from "next/link";
import BlogSection from "./BlogSection";

export default async function Home({ searchParams }) {
  const client = getClient();
  const { status } = await searchParams;
  const {
    data: homepageData,
    loading: homeLoading,
    error: homeError,
  } = await client.query({
    query: GET_HOMEPAGE,
    variables: {
      status,
    },
  });
  const {
    data: blogData,
    loading: blogsLoading,
    error: blogsError,
  } = await client.query({
    query: GET_BLOGS,
    variables: { pagination: { page: 1, pageSize: 3 }, sort: "createdAt:desc" },
  });
  const homepage = homepageData.homepage;
  const blogs = blogData.blogs_connection.nodes;
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
          <Image
            src={`${BASE_URL}${homepage.hero.heroImage.url}`}
            alt={homepage.hero.title}
            width={homepage.hero.heroImage.width}
            height={homepage.hero.heroImage.height}
            className="mx-auto mt-6 rounded-lg shadow-lg object-cover"
            priority
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
      <BlogSection blogs={blogs}/>
      <footer className="text-center py-6 text-sm text-gray-500 border-t">
        <p>{homepage?.footer?.footerText}</p>
      </footer>
    </main>
  );
}
