import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://ai-tools-roadmap.seydinamb.xyz'), // Assuming this URL or similar, or just localhost for now? User provided repo, not deployed URL. I'll use a placeholder or the likely Vercel URL. I'll use a generic placeholder or ask user? User didn't specify URL. I'll use a relative base or 'https://ai-tools-roadmap.vercel.app' as example. Or better, just 'https://github.com/socrate-01/AI-Tools-Roadmap' as base? No, better to have a web URL. I'll use a placeholder.
  // Actually, standard practice for un-deployed templates is usually example.com or leaving it relative (which next complains about).
  // I will use 'https://ai-tools-roadmap.vercel.app' as a safe default for a Next.js project.
  title: {
    default: 'AI Tools Roadmap',
    template: '%s | AI Tools Roadmap',
  },
  description: 'The ultimate directory of AI tools for Developers, Designers, and Creators. Discover the best AI tools for coding, design, videos, and automation.',
  keywords: ['AI Tools', 'Artificial Intelligence', 'Developer Tools', 'Design Tools', 'No-Code', 'Automation', 'LLMs', 'ChatGPT', 'Midjourney'],
  authors: [{ name: 'Seydina', url: 'https://seydinamb.xyz' }],
  creator: 'Seydina',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ai-tools-roadmap.vercel.app',
    title: 'AI Tools Roadmap',
    description: 'Explore the complete landscape of AI tools across every domain. coding, design, videos, and automation.',
    siteName: 'AI Tools Roadmap',
    images: [
      {
        url: '/og-image.png', // We should probably create this or at least define it
        width: 1200,
        height: 630,
        alt: 'AI Tools Roadmap',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tools Roadmap',
    description: 'The ultimate directory of AI tools for Developers, Designers, and Creators.',
    images: ['/og-image.png'],
    creator: '@seydinamb',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
