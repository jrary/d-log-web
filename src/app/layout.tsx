import type { Metadata } from "next"
import { Inter, Lora } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const lora = Lora({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-serif" })

export const metadata: Metadata = {
  title: "d-log — 하루를 기록하다",
  description: "계획하고, 습관을 추적하고, 감사와 무드를 기록하는 개인 플래너",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${inter.variable} ${lora.variable} font-sans antialiased`}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
