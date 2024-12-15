import type { Metadata } from 'next';

import './globals.css';

import Toaster from '@/components/layout/toaster';
import { Geist } from 'next/font/google';

import { Providers } from './providers';

const font = Geist({ subsets: ['latin'] });

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
      <body className={`${font.className} antialiased`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
