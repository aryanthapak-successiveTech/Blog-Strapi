import Image from "next/image";
import { BASE_URL } from "@/utils/Constants";
import { getClient } from "@/lib/apolloClient";
import { GET_ABOUT } from "@/graphql/about/queries";

export default async function AboutPage() {
  const client =getClient();
  const { data:aboutPageData, loading, error } = await client.query({query:GET_ABOUT});
  if (loading) return <p className="p-4">Loading AboutPage</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;
  const aboutPage=aboutPageData.aboutPage;

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