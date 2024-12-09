'use client';

import { Github } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

import Logo from '../logo';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ThemeToggle } from './theme-toggle';

const Header = () => {
  const session = useSession();

  return (
    <header className="fixed top-0 flex h-16 w-full items-center justify-between border-b px-4 md:px-32">
      <Link className="overflow-hidden" href="/">
        <Logo className="h-12 w-full rounded-md" />
      </Link>

      <div className="flex flex-row items-center gap-3">
        {session.status === 'unauthenticated' && (
          <Button onClick={() => signIn('github')}>
            <Github /> Sign in
          </Button>
        )}

        {session.status === 'authenticated' && (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row gap-3 items-center focus:outline-none">
              <span>{session.data.user.name}</span>

              {session.data.user.image && (
                <Image
                  src={session.data.user.image}
                  alt="User icon"
                  height={100}
                  width={100}
                  className="w-8 h-8 rounded-full"
                />
              )}

              {!session.data.user.image && (
                <CircleUserRound className="w-9 h-9" />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href="auth/profile">
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => signOut()}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
