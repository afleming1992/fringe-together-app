import { AuthProvider } from './components/AuthProvider'
import NavBar from './components/Nav'
import './globals.css'
import { Inter } from 'next/font/google'
import supabase from '@/lib/supabase/server'
import { access } from 'fs'
import Providers from './components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const revalidate = 0;

export const metadata = {
  title: 'Fringe Group Planner',
  description: '',
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
        <Providers accessToken={accessToken}>
          <main className='min-h-screen w-screen bg-white dark:bg-gray-900'>
              <main className='m-auto'>
                  <NavBar />
                  {children}
              </main>
          </main>
        </Providers>
      </body>  
    </html>
  )
}
