import Header from '@/components/layout/header';
import { Frown } from 'lucide-react';
import Link from 'next/link';

const NotFound = () => (
  <>
    <Header />
    <main className="flex h-full flex-col items-center justify-center gap-2 mt-20">
      <Frown className="w-10 dark:text-primary" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the page you were looking for.</p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-secondary px-4 py-2 text-sm text-foreground hover:opacity-90"
      >
        Go Back
      </Link>
    </main>
  </>
);

export default NotFound;
