"use client";
import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function ReactQueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 100,
          },
        },
      })
  );
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
