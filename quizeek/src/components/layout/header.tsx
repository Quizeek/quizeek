'use client';

import { CircleUserRound } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

import Logo from '../logo';
import { SignInButton } from '../sign-in-button';
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
    <header className="fixed top-0 h-16 w-full border-b px-4 bg-background z-50">
      <div className="w-full max-w-[1920px] mx-auto flex items-center justify-between h-full">
        <Link className="overflow-hidden" href="/">
          <Logo className="h-12 w-auto rounded-md" />
        </Link>

        <div className="flex flex-row items-center gap-3">
          {session.status === 'unauthenticated' && <SignInButton />}

          {session.status === 'authenticated' && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex flex-row gap-3 items-center focus:outline-none hover:bg-accent py-1 px-2 rounded-md">
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
                <Link href="/auth/profile">
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
      </div>
    </header>
  );
};

export default Header;
