"use client";
import React, { useMemo } from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { HttpLink } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { useSession } from "next-auth/react";

export const ApolloClientProvider = ({ children }) => {
  const session=useSession();
  const isAuthenticated=session?.status==="authenticated";
  const token=isAuthenticated?process.env.NEXT_PUBLIC_STRAPI_API_TOKEN:null;

  const client = useMemo(() => {
    const httpLink = new HttpLink({
      uri: "http://localhost:1337/graphql",
    });

    const authLink = setContext((_, { headers }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${token}`
      },
    }));

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }, [isAuthenticated]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
