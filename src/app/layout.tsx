
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/use-auth';
import { LenisProvider } from '@/components/common/LenisProvider';

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Sora:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <LenisProvider>
          <AuthProvider>
              {children}
              <Toaster />
          </AuthProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
