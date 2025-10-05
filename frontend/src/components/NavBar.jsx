import { getClient } from "@/lib/apolloClient";
import { GET_SETTINGS } from "@/graphql/site-settings/queries";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const client = getClient();
  const { data } = await client.query({ query: GET_SETTINGS });
  const siteSettings = data?.siteSetting || {};

  return (
    <NavbarClient
      siteSettings={siteSettings}
    />
  );
}
