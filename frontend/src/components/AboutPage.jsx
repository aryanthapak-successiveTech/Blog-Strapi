"use client";

import Image from "next/image";
import { BASE_URL } from "@/utils/Constants";
import { useAboutpage} from "@/hooks/useAboutPage";

export default function AboutPage() {
  const { aboutPage, loading, error } = useAboutpage();
  if (loading) return <p className="p-4">Loading AboutPage</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;

  if (!aboutPage) return <p className="p-4">No AboutPage content found.</p>;

  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">{aboutPage.title}</h1>

      {aboutPage.heroImage?.url && (
        <div className="mb-6">
          <Image
            src={`${BASE_URL}${aboutPage.heroImage.url}`}
            alt={aboutPage.title}
            width={1000}
            height={500}
            className="rounded-lg object-cover"
            priority
          />
        </div>
      )}

      <article
        className="prose prose-lg max-w-none"
      >
        <p>{aboutPage?.content}</p>

      </article>
    </section>
  );
}
