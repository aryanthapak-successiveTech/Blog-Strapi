import { gql } from "@apollo/client";

export const CREATE_BLOG = gql`
  mutation CreateBlog($data: BlogInput!) {
    createBlog(data: $data) {
      documentId
      title
      article
      blogImage {
        url
      }
    }
  }
`;

export const UPDATE_BLOG = gql`
  mutation UpdateBlog($documentId: ID!, $status: PublicationStatus, $data: BlogInput!) {
    updateBlog(documentId: $documentId,  status: $status,data: $data) {
      documentId
      title
      article
      blogImage {
        url
      }
    }
  }
`;