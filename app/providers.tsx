"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/hooks/useAuth";
import { UsersProvider } from "@/hooks/useUsers";
import { Toaster } from "sonner";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <UsersProvider>
          {children}
          <Toaster richColors position="top-right" />
        </UsersProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}