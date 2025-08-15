"use client"

import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import * as motion from "motion/react-client"
import { ChatProvider } from "../contexts/ChatContext"
import ErrorBoundary from "../components/ErrorBoundary"

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ErrorBoundary name="authenticated-layout">
      <ChatProvider>
        <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-900 sticky top-0 z-50">
          <Link href="/">
            <motion.h1 
              className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              suchef
            </motion.h1>
          </Link>
          <UserButton afterSignOutUrl="/" />
        </header>
        {children}
      </ChatProvider>
    </ErrorBoundary>
  )
}