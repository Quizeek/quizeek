'use client';

import { Github } from 'lucide-react';
import { signIn } from 'next-auth/react';

import { Button } from './ui/button';

type SignInButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SignInButton = ({ ...props }: SignInButtonProps) => {
  return (
    <Button {...props} onClick={() => signIn('github')}>
      <Github /> Sign in
    </Button>
  );
};
