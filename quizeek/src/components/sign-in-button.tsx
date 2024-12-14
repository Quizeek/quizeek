'use client';

import { Github } from 'lucide-react';
import { signIn } from 'next-auth/react';

import { Button } from './ui/button';

type SignInButtonProps = {
  text?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SignInButton = ({ text, ...props }: SignInButtonProps) => {
  return (
    <Button {...props} onClick={() => signIn('github')}>
      <Github /> {text ?? 'Sign in'}
    </Button>
  );
};
