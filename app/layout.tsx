import NavBar from './components/Nav'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Fringe Group Planner',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
        <body className={inter.className}>
        <main className='min-h-screen w-screen bg-white dark:bg-gray-900'>
          <main className='m-auto'>
              <NavBar />
              {children}
          </main>
        </main>
      </body>  
    </html>
  )
}
