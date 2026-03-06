import type React from "react"
import type { Metadata, Viewport } from "next"
import { Pixelify_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixelify",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Kisu X3",
  description: "Personal profile with glassmorphism design",
  generator: 'v0.app',
  icons: {
    icon: '/profile.jpg',
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload the video for instant playback */}
        <link rel="preload" href="/mv.mp4" as="video" type="video/mp4" />
      </head>
      <body className={`${pixelify.variable} font-sans antialiased text-white selection:bg-blue-500/30 selection:text-blue-100`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
