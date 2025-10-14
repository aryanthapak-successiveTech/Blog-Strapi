import { gql } from "@apollo/client";

export const GET_ABOUT=gql`query Blog {
  aboutPage {
    title
    content
    heroImage {
      url,
      height,
      width
    }
  }
}`