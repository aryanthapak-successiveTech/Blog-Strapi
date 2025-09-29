"use client";
import React, { useMemo } from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { HttpLink } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { useAuth } from "./AuthContext";

export const ApolloClientProvider = ({ children }) => {
  const { token } = useAuth();

  const client = useMemo(() => {
    const httpLink = new HttpLink({
      uri: "http://localhost:1337/graphql",
    });

    const authLink = setContext((_, { headers }) => ({
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    }));

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }, [token]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
