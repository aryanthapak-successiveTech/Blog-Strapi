"use client"
import { useAuth } from "@/context/AuthContext";
import { CREATE_BLOG } from "@/graphql/blogs/mutations";
import { BASE_URL } from "@/utils/Constants";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";

export default function AddBlog() {
  const { token } = useAuth();
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");
  const [file, setFile] = useState(null);
  const [createBlog, { loading, error }] = useMutation(CREATE_BLOG);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageId = null;

    if (file) {
      const formData = new FormData();
      formData.append("files", file);

      console.log(file);

      const uploadRes = await fetch(`${BASE_URL}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const uploaded = await uploadRes.json();
      imageId = uploaded[0]?.id;
    }

    await createBlog({
      variables: {
        data: {
          title,
          article,
          blogImage: imageId,
        },
      },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    setTitle("");
    setArticle("");
    setFile(null);
    alert("Blog created successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Add New Blog</h1>

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
          <label className="block font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
        >
          {loading ? "Saving..." : "Create Blog"}
        </button>

        {error && <p className="text-red-500">Error: {error.message}</p>}
      </form>
    </div>
  );
}