import { gql } from "@apollo/client";

export const GET_HOMEPAGE=gql`query Homepage($status: PublicationStatus) {
  homepage( status: $status) {
    documentId
    hero {
      id
      title
      subtitle
      heroImage {
        url,
        height,
        width
      }
      ctaLink
      ctaText
    }
    footer {
      footerText
    }
  }
}`