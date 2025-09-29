import { gql } from "@apollo/client";

export const GET_SETTINGS=gql`query SiteSetting {
  siteSetting {
    logo {
      url
    }
    siteName
    navigation {
      id
      label
      route
    }
    authNavigation {
      id
      buttonText
      buttonRoute
      buttonLogo {
        url
      }
    }
  }
}`;