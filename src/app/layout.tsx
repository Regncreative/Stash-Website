import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import { CursorGlow } from '@/components/sections/CursorGlow'
import { SITE } from '@/lib/constants'
import './globals.css'

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.author }],
  creator: SITE.author,
  keywords: [
    'Stash',
    'Windows 11',
    'file shelf',
    'system tray',
    'productivity',
    'Fluent Design',
    'drag and drop',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url: '/brand/og.png',
        width: 1200,
        height: 630,
        alt: 'Stash — a modern file shelf for Windows',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: ['/brand/og.png'],
  },
  icons: {
    icon: [{ url: '/brand/logo.png', type: 'image/png' }],
    apple: [{ url: '/brand/logo.png' }],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#f4f7fb',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <CursorGlow />
        {children}
      </body>
    </html>
  )
}
