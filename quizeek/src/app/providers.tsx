import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { PropsWithChildren } from 'react';

export const Providers = ({ children }: PropsWithChildren) => (
  <ThemeProvider attribute="class" disableTransitionOnChange>
    <SessionProvider>{children}</SessionProvider>
  </ThemeProvider>
);
