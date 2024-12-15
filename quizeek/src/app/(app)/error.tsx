'use client';

import { Frown } from 'lucide-react';
import Link from 'next/link';

const Error = () => (
  <div className="flex h-full flex-col items-center justify-center gap-2">
    <Frown className="w-10 dark:text-primary" />
    <h2 className="text-xl font-semibold">Error</h2>
    <p>Oops something went wrong.</p>
    <Link
      href="/"
      className="mt-4 rounded-md bg-secondary px-4 py-2 text-sm text-foreground hover:opacity-90"
    >
      Go Back
    </Link>
  </div>
);

export default Error;
