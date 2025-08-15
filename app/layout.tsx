import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import { ThemeProvider } from "./providers";
import DefaultCursor from "./components/DefaultCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SuChef - Your AI Culinary Companion",
  description:
    "AI-powered cooking assistant with personalized recipe guidance, ingredient suggestions, and culinary expertise from Chef Nyanya",
  keywords: [
    "cooking",
    "recipes",
    "AI chef",
    "culinary",
    "meal planning",
    "Nyanya",
  ],
  authors: [{ name: "SuChef Team" }],
  openGraph: {
    title: "SuChef - Your AI Culinary Companion",
    description:
      "Transform your cooking with AI-powered recipe suggestions and guidance",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider>
            <DefaultCursor />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
