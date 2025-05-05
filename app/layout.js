import Navbar from '@/app/_components/layout/navbar/Navbar'
import Footer from '@/app/_components/layout/Footer'
import ThemeWrapper from '@/app/ThemeWrapper'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata = {
  title: 'Mizar Zulmi Ramadhan',
  description: 'Web Developer',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeWrapper>
          <div className="flex min-h-screen flex-col bg-[rgb(var(--background))] text-[rgb(var(--foreground))]">
            <Navbar />
            <main className="flex-1">
              <div className="custom-w mx-auto w-full flex-1 flex-col px-4 py-8 sm:py-12">
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </ThemeWrapper>
      </body>
    </html>
  )
}