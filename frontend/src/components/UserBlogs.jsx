"use client";

import { useQuery} from "@apollo/client/react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { GET_BLOGS_WITH_FILTER } from "@/graphql/blogs/queries";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/utils/Constants";


export default function UserBlogs() {
  const { user, loading: authLoading } = useAuth();
  const router=useRouter();
  const { data, loading, error } = useQuery(GET_BLOGS_WITH_FILTER, {
    skip: authLoading || !user,
    variables: {
      filters: {
        postedBy: {
          username: { eq: user?.username },
        },
      },
    },
  });

  if (authLoading || loading) return <p>Loading blogs…</p>;
  if (error) return <p className="text-red-600">Error: {error.message}</p>;
  if (!data?.blogs?.length) return <p>No blogs found for {user?.username}</p>;

  const onEditClick=(blogId)=>{
    router.push(`/blogs/${blogId}/edit`);
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {data.blogs.map((blog) => (
    <div
      key={blog.documentId}
      className="border rounded-lg p-4 shadow hover:shadow-lg transition relative"
    >
      <Link href={`/blogs/${blog.documentId}`}>
        {blog.blogImage && (
          <img
            src={`${BASE_URL}${blog.blogImage.url}`}
            alt={blog.title}
            className="w-full h-48 object-cover rounded mb-3"
          />
        )}
        <h2 className="text-lg font-semibold">{blog.title}</h2>
        <p className="text-sm text-gray-500">
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>
      </Link>

      {/* Edit button */}
      <button
        onClick={() => onEditClick(blog.documentId)}
        className="absolute top-2 right-2 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-500 transition"
      >
        Edit
      </button>
    </div>
  ))}
  
</div>

  );
}
