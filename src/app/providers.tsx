"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/services/config/query-client";
import { AuthProvider } from "@/context/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
