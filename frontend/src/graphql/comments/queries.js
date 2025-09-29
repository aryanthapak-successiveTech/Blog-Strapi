import { gql } from "@apollo/client";

export const GET_COMMENTS = gql`
  query Comments($filters: CommentFiltersInput) {
    comments(filters: $filters) {
      commentText
      commentedBy {
        username
      }
      documentId
      createdAt
    }
  }
`;
