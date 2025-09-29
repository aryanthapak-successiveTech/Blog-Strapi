import { gql } from "@apollo/client";

export const GET_HOMEPAGE=gql`query Homepage {
  homepage {
    documentId
    hero {
      id
      title
      subtitle
      heroImage {
        url
      }
      ctaLink
      ctaText
    }
    footer {
      footerText
    }
  }
}`