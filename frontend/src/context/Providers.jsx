"use client";

import { SessionProvider } from "next-auth/react";
import { ApolloClientProvider } from "@/context/ApolloClientProvider";


export default function Providers({ children }) {
  return (
    <SessionProvider>
        <ApolloClientProvider>
          {children}
        </ApolloClientProvider>
    </SessionProvider>
  );
}
