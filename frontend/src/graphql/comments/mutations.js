import { gql } from "@apollo/client";

export const ADD_COMMENT=gql`mutation CreateComment($data: CommentInput!) {
  createComment(data: $data) {
    documentId
  }
}
`