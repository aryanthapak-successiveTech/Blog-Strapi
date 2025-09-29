"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { GET_COMMENTS } from "@/graphql/comments/queries";
import { ADD_COMMENT } from "@/graphql/comments/mutations";


export default function CommentSection() {
  const { blogId } = useParams();
  const { user} = useAuth();
  const [commentText, setCommentText] = useState("");

  const { data, loading, error, refetch } = useQuery(GET_COMMENTS, {
    variables: {
      filters: {
        commentedOn: { documentId: { eq: blogId } },
      },
    },
  });


  const [addComment, { loading: adding }] = useMutation(ADD_COMMENT, {
    onCompleted: () => {
      setCommentText("");
      refetch();
    },
    onError: (err) => {
      console.error("Error adding comment:", err);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    await addComment({
      variables: {
        data: {
          commentText,
          commentedOn: blogId,
        },
      }
    });
  };

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p className="text-red-600">Error loading comments</p>;

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="w-full border rounded p-2 mb-2"
            rows={3}
            required
          />
          <button
            type="submit"
            disabled={adding}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
          >
            {adding ? "Posting..." : "Post Comment"}
          </button>
        </form>
      ) : (
        <p className="text-gray-600 mb-4">Log in to add a comment.</p>
      )}

      <div className="space-y-4">
        {data?.comments?.length ? (
          data.comments.map((comment) => (
            <div
              key={comment.documentId}
              className="border rounded-lg p-3 shadow-sm"
            >
              <p className="text-gray-800">{comment.commentText}</p>
              <p className="text-sm text-gray-500 mt-1">
                By <span className="font-medium">{comment.commentedBy?.username || "Unknown"}</span> ·{" "}
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </section>
  );
}