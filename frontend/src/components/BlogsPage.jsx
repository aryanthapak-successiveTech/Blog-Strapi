"use client"
import { useBlogs } from "@/hooks/useBlogs";
import { BASE_URL } from "@/utils/Constants";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BlogsPage() {
  const { loading, error, blogs } = useBlogs();
  const router=useRouter();
  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const onBlogClickHandler=(blogId)=>{
    router.push(`/blogs/${blogId}`);
  }
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Latest Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs && blogs.map((blog) => (
          <article
            onClick={()=>onBlogClickHandler(blog.documentId)}
            key={blog.documentId}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            {blog.blogImage?.url && (
              <div className="relative h-56 w-full">
                <Image
                  src={`${BASE_URL}${blog.blogImage.url}`}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-500 text-sm">
                Published: {new Date(blog.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </article>
        ))}
      </div>

    </main>
  );
}