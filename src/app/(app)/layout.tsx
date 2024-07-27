import React from 'react'
import './globals.scss'
import { Inter } from 'next/font/google'
import Header from './Header'
import Footer from './Footer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

/* Our app sits here to not cause any conflicts with payload's root layout  */
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html className={'mx-auto'}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

export default Layout
