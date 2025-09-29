import { gql } from "@apollo/client/core";

export const GET_BLOGS = gql`
  query Blogs_connection($pagination: PaginationArg) {
    blogs_connection(pagination: $pagination) {
      pageInfo {
        total
        page
        pageSize
        pageCount
      }
      nodes {
        documentId
        title
        blogImage {
          url
        }
        createdAt
      }
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
