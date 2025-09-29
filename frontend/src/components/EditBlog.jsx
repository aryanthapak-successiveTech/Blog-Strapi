"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { useParams, useRouter } from "next/navigation";
import { BASE_URL } from "@/utils/Constants";
import { GET_BLOG, GET_BLOGS_WITH_FILTER } from "@/graphql/blogs/queries";
import { UPDATE_BLOG } from "@/graphql/blogs/mutations";
import { useAuth } from "@/context/AuthContext";

export default function EditBlog() {
  const {user,token}=useAuth();
  const { blogId } = useParams();
  const router = useRouter();

  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useQuery(GET_BLOG, {
    variables: { documentId: blogId },
  });

  const [updateBlog, { loading: mutationLoading, error: mutationError }] =
    useMutation(UPDATE_BLOG);

  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (data?.blog) {
      setTitle(data.blog.title || "");
      setArticle(data.blog.article || "");
    }
  }, [data]);

  if (queryLoading) return <p>Loading blog…</p>;
  if (queryError)
    return <p className="text-red-500">Error: {queryError.message}</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageId = data.blog.blogImage?.id || null;

    if (file) {
      const formData = new FormData();
      formData.append("files", file);

      const uploadRes = await fetch(`${BASE_URL}/api/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const uploaded = await uploadRes.json();
      imageId = uploaded[0]?.id;
    }

    await updateBlog({
      variables: {
        documentId: blogId,
        data: {
          title,
          article,
          blogImage: imageId,
        },
        status: "PUBLISHED",
      },
      refetchQueries: [{ query: GET_BLOG, variables: { documentId: blogId } },{query:GET_BLOGS_WITH_FILTER, variables: {
      filters: {
        postedBy: {
          username: { eq: user?.username },
        },
      },
    },}],
      awaitRefetchQueries: true,
    });
    router.push(`/blogs/${blogId}`);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Article</label>
          <textarea
            value={article}
            onChange={(e) => setArticle(e.target.value)}
            className="w-full border p-2 rounded h-32"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Upload New Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full"
          />
          {data && data.blog.blogImage?.url && (
            <img
              src={`${BASE_URL}${data.blog.blogImage.url}`}
              alt="Current"
              className="mt-2 h-32 object-cover rounded"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={mutationLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
        >
          {mutationLoading ? "Updating…" : "Update Blog"}
        </button>

        {mutationError && (
          <p className="text-red-500">Error: {mutationError.message}</p>
        )}
      </form>
    </div>
  );
}
