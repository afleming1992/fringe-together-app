import NavBar from './components/Nav'
import './globals.css'
import { Inter } from 'next/font/google'
import supabase from '@/lib/supabase/server'
import Providers from './components/Providers'
import { cookies } from 'next/headers'
import { theme } from './components/Providers'
import { FlashlessScript } from 'chakra-ui-flashless'

const inter = Inter({ subsets: ['latin'] })

export const revalidate = 0;

export const metadata = {
  title: 'FringeTogether',
  description: 'Planning your Fringe',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;

  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <Providers accessToken={accessToken} cookies={cookies()}>
          <NavBar />
          {children}
        </Providers>
      </body>  
    </html>
  )
}
