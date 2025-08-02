
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/use-auth';
import { LenisProvider } from '@/components/common/LenisProvider';
import { Inter, Space_Grotesk } from 'next/font/google';
import { Suspense } from 'react';
import Loading from './loading';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});


// This metadata will be applied to the page but can be overridden
// export const metadata: Metadata = {
//   title: 'Talent Flow',
//   description: 'A freelance service marketplace.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="dark">
      <head>
        <title>Talent Flow</title>
        <meta name="description" content="A freelance service marketplace." />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased`}>
        <LenisProvider>
          <AuthProvider>
              <Suspense fallback={<Loading />}>
                {children}
              </Suspense>
              <Toaster />
          </AuthProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
