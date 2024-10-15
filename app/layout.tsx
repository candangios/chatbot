import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

import '@/app/globals.css'
import { cn } from '@/lib/utils'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/sonner'
import Script from 'next/script'
import TelegramAuth from '@/components/TelegramAuth'
import BottomNav from '@/components/bottom-nav'
import MaxWidthWrapper from '@/components/max-width-wrapper'
import { AuthProvider } from '@/lib/hooks/use-auth'
import { AI } from '@/lib/chat/actions'
import { Outfit, Open_Sans } from 'next/font/google'
import Image from 'next/image'
const openSans = Open_Sans({
  weight: ['400', '600', '700'], // Specify the weights you want to use
  subsets: ['latin'],  // You can include other subsets like 'latin-ext'
});

const outfit = Outfit({
  weight: ['400', '500', '700'], // Specify the weights you want to use
  subsets: ['latin'],
});
export const metadata = {
  metadataBase: process.env.VERCEL_URL
    ? new URL(`https://telegram.1chain.ai/`)
    : undefined,
  title: {
    default: 'MachinaFi mini app',
    template: ``
  },
  description: 'Simplify web 3 mass adoption with AI.',
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${openSans.className} ${outfit.className}`}
    >
      <body
        className={cn(
          `font-sans antialiased overflow-hidden`,
          GeistSans.variable,
          GeistMono.variable
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
              <Image className='absolute w-full h-auto bottom-0 z-[-10] opacity-30' sizes="100vw" src='/images/bg_bottom.png' width={0} height={500} alt='' />
              <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#000000]  ">
                {/* <Image className='absolute w-full h-auto bottom-0 z-10' sizes="100vw" src='/images/bg_bottom.png' width={0} height={500} alt='' /> */}
                <MaxWidthWrapper>


                  <main>{children}</main>
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
