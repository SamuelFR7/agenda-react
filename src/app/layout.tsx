import { Toaster } from "@/components/ui/toaster"

import "@/styles/globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider, currentUser } from "@clerk/nextjs"

import { Header } from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Agenda",
  description: "Agenda de contatos",
  icons: {
    icon: "/favicon.ico",
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header user={user} />
          <main>{children}</main>
        </body>
        <Toaster />
      </html>
    </ClerkProvider>
  )
}