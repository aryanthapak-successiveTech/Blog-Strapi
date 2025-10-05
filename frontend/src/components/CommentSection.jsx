import { getClient } from "@/lib/apolloClient";
import { GET_COMMENTS } from "@/graphql/comments/queries";

export default async function CommentSection({ blogId }) {
  const client = getClient();

  const { data } = await client.query({
    query: GET_COMMENTS,
    variables: {
      filters: {
        commentedOn: { documentId: { eq: blogId } },
      },
    },
    fetchPolicy: "network-only",
  });

  const comments = data?.comments || [];

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      <div className="space-y-4">
        {comments.length ? (
          comments.map((comment) => (
            <div
              key={comment.documentId}
              className="border rounded-lg p-3 shadow-sm"
            >
              <p className="text-gray-800">{comment.commentText}</p>
              <p className="text-sm text-gray-500 mt-1">
                By{" "}
                <span className="font-medium">
                  {comment.commentedBy?.username || "Anonymous"}
                </span>{" "}
                · {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </section>
  );
}
