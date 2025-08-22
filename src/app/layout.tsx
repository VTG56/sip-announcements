import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import DotMatrix from '@/components/DotMatrix'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Student Induction Programme 2025',
  description: 'Student announcements hub for circulars, bootkit, counselor details, venues, and clubs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <DotMatrix />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  )
}
