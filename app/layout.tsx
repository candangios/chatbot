import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

import '@/app/globals.css'
import { cn } from '@/lib/utils'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/sonner'
import Script from 'next/script'
import { getSession } from '@/utils/session'
import TelegramAuth from '@/components/TelegramAuth'
import BottomNav from '@/components/bottom-nav'
import MaxWidthWrapper from '@/components/max-width-wrapper'
import { AuthProvider } from '@/lib/hooks/use-auth'
import { AI } from '@/lib/chat/actions'

export const metadata = {
  metadataBase: process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : undefined,
  title: {
    default: '1chain.ai mini app',
    template: `%s - Next.js AI Chatbot`
  },
  description: 'An AI-powered chatbot template built with Next.js and Vercel.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {

  return (
    <html lang="en" suppressHydrationWarning>
      {/* <head>
        <Script src='https://telegram.org/js/telegram-web-app.js' strategy='beforeInteractive' />
      </head> */}
      <body
        className={cn(
          'font-sans antialiased',
          // GeistSans.variable,
          // GeistMono.variable
        )}
      >
        <Toaster position="top-center" />
        <Providers
          attribute="class"
          defaultTheme="sytem"
          enableSystem
          disableTransitionOnChange
        >
          {/* <main className='flex min-h-screen flex-col items-center justify-center p-24'>
            <h1 className='text-4xl font-bold mb-8'>JWT Authentication for Telegram mini app</h1>
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <TelegramAuth />
          </main> */}
          <AuthProvider>
            <AI>
              <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#000000] to[#00E2E2] via-50%  bg-black bg-opacity-15  ">
                <MaxWidthWrapper>
                  <main>
                    {children}
                  </main>
                </MaxWidthWrapper>
                <BottomNav />
              </div>
              <TailwindIndicator />
            </AI>

          </AuthProvider>



        </Providers>
      </body>
    </html>
  )
}
