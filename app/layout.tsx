import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientWrapper from "@/components/client-wrapper"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VisaMate - AI-Powered Study Abroad Toolkit",
  description: "Your AI companion for studying abroad - SOP, LOR, Visa help and more",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ opacity: 1 }} suppressHydrationWarning>
      <body className={inter.className} style={{ opacity: 1, minHeight: "100vh" }}>
        <ThemeProvider defaultTheme="system" storageKey="visamate-theme">
          <ClientWrapper>{children}</ClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
