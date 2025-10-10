import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import ActiveSectionContextProvider from '@/context/active-section-context'
// import ThemeSwitch from '@/components/theme-switch';
import Footer from '@/components/footer';
import ThemeContextProvider from '@/context/theme-context';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ethan Vasquez | Portfolio',
  description: 'Ethan Vasquez is a Senior @ ASU, looking for internships and jobs in Software Development',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="!scroll-smooth">
  
      <head>
        {/* Head content */}
      </head>

  <body className={`${inter.className}
   text-gray-950 relative min-h-screen 
  pt-28 sm:pt-36 bg-gradient-to-b from-transparent via-stone-200 to-yellow-200`}>
        <ThemeContextProvider>
        <ActiveSectionContextProvider>
          <Header />
          {children}
          <p className=" text-center pb-10 font-extrabold text-4xl"> ETHAN VASQUEZ </p>
          <Footer />
          <Toaster position="top-right" />
        </ActiveSectionContextProvider>
        </ThemeContextProvider>
        </body>
    </html>
  );
}
