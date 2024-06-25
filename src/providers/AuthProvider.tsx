"use client";
import type { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  const localization = {
    signUp: {
      start: {
        subtitle: "",
        title: "",
      },
    },
    signIn: {
      start: {
        subtitle: "",
        title: "",
      },
    },
  };
  return theme === "dark" ? (
    <ClerkProvider
      localization={localization}
      appearance={{
        baseTheme: dark,
      }}
    >
      {children}
    </ClerkProvider>
  ) : (
    <ClerkProvider localization={localization}>{children}</ClerkProvider>
  );
}
