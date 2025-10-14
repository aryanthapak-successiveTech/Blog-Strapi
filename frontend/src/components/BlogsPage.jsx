import { getClient } from "@/lib/apolloClient";
import { GET_BLOG_PAGINATED } from "@/graphql/blogs/queries";
import BlogsPageClient from "./BlogsPageClient";

const limit = 4;

export default async function BlogsPage() {
  const client = getClient();

  const { data } = await client.query({
    query: GET_BLOG_PAGINATED,
    variables: { cursor: null, limit },
  });

  const blogs = data?.blogsPaginated?.data || [];
  const pageInfo = data?.blogsPaginated?.pageInfo;

  return (
    <main className="max-w-6xl mx-auto p-6">
      {pageInfo?.hasNextPage && (
        <BlogsPageClient initialBlogs={blogs} initialPageInfo={pageInfo} />
      )}
    </main>
  );
}
