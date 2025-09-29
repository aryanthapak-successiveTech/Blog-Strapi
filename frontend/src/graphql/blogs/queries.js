import { gql } from "@apollo/client/core";

export const GET_BLOGS = gql`
  query Blogs($pagination: PaginationArg) {
    blogs(pagination: $pagination) {
      title
      blogImage {
        url
      }
      documentId
      createdAt
      publishedAt
    }
  }
`;

export const GET_BLOG = gql`
  query Blog($documentId: ID!) {
    blog(documentId: $documentId) {
      documentId
      title
      article
      blogImage {
        url
      }
      createdAt
      updatedAt
      publishedAt
      postedBy {
        username
      }
    }
  }
`;

export const GET_BLOGS_WITH_FILTER = gql`
  query Query($filters: BlogFiltersInput) {
    blogs(filters: $filters) {
      documentId
      title
      blogImage {
        url
      }
      createdAt
    }
  }
`;
