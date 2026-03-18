import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Solar System — Interactive 3D Visualization",
  description:
    "Explore the solar system in interactive 3D with React Three Fiber and Three.js",
}

export const viewport: Viewport = {
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-black">{children}</body>
    </html>
  )
}
