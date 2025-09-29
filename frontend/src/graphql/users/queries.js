import { gql } from "@apollo/client";

export const GET_USER_DATA=gql`query Query {
  me {
    username
    role {
      type
    }
  }
}`