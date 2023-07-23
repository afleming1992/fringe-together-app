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
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
        <meta name="description" content="description of your project" />
        <meta name="theme-color" content="#000" />
        <title>Title of the project</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
      </head>
      <body className={inter.className}>
        <Providers accessToken={accessToken} cookies={cookies()}>
          <NavBar />
          {children}
        </Providers>
      </body>  
    </html>
  )
}
