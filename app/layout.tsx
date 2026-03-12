import type { Metadata, Viewport } from 'next'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'SXSW HOT TAKES 2026',
  description: 'Swipe on the hottest topics at SXSW. Powered by Podium.',
  openGraph: {
    title: 'SXSW HOT TAKES 2026',
    description: 'What does SXSW actually think is hot? Swipe to vote.',
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
    <html lang="en">
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
