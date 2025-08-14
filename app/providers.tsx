"use client";

import { ThemeProvider as ReablocksThemeProvider, theme } from "reablocks";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReablocksThemeProvider theme={theme}>{children}</ReablocksThemeProvider>
  );
}
