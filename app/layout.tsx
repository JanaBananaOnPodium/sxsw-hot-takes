import type { Metadata, Viewport } from 'next'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'SXSW HOT or NOT — Insider Leaderboard',
  description: 'Swipe on the hottest topics at SXSW 2026. See what insiders actually think is fire.',
  openGraph: {
    title: 'SXSW HOT or NOT',
    description: 'Insider leaderboard. Swipe right if it\'s fire. Left if it\'s mid.',
    siteName: 'SXSW HOT or NOT',
    url: 'https://sxswhotornot.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SXSW HOT or NOT',
    description: 'Insider leaderboard. Swipe right if it\'s fire. Left if it\'s mid.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans bg-white text-black">
        {children}
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  )
}
