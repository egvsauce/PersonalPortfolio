import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import ActiveSectionContextProvider from '@/context/active-section-context'
import ThemeSwitch from '@/components/theme-switch';
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
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
  
        <head>
        {/* Set `.dark` before React hydrates to avoid flash/mismatch */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  try {
    const pref = localStorage.getItem('theme');                     // 'dark' | 'light' | null
    const sys = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = pref ? (pref === 'dark') : sys;
    document.documentElement.classList.toggle('dark', dark);
  } catch {}
})();
          `,
          }}
        />
      </head>

  <body className={`${inter.className}
  bg-gray-300 text-gray-950 dark:bg-gray-900 dark:text-white relative min-h-screen 
  pt-28 sm:pt-36`}>
        <div
          className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] 
          h-[31.25rem] w-[31.25rem] rounded-full blur-[3rem]
          sm:w-[68.75rem]">
        </div>

        <div
          className="bg-[#dbd7fb] absolute top- [ -1rem] left-30rem] 
          h-[31.25rem] w-[50rem] rounded-full blur-[3rem]
          sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] x1:left-[-15rem] 2xl:left-[-5rem]">
        </div>
        <ThemeContextProvider>
        <ActiveSectionContextProvider>
          <Header />
          {children}
          <Footer />
          <Toaster position="top-right" />
        </ActiveSectionContextProvider>
        </ThemeContextProvider>
        </body>
    </html>
  );
}
