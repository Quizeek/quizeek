import type { Metadata } from 'next';

import './globals.css';

import Toaster from '@/components/layout/toaster';
import localFont from 'next/font/local';

import { Providers } from './providers';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Quizeek App',
    default: 'Quizeek App',
  },
  description: 'A platform to create and take quizes.',
  keywords: ['quiz', 'online quiz', 'create quiz', 'quizeek'],
  openGraph: {
    title: 'Quizeek App',
    description: 'Create and take quizes online.',
    url: 'https://quizeek.vercel.app/',
    type: 'website',
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
