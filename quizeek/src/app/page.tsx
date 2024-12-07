'use client';

import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const Home = () => {
  // on serverside you can use
  const session = useSession();

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      {session.status === 'loading' && <p>Loading ...</p>}
      {session.status === 'unauthenticated' && (
        <Button onClick={() => signIn('github')}>
          <Github /> Sign in
        </Button>
      )}
      {session.status === 'authenticated' && (
        <div className="flex flex-col items-center gap-2">
          <Button onClick={() => signOut()}>Sign out</Button>
          {session.data.user.email}
          {session.data.user.image && (
            <Image
              src={session.data.user.image}
              alt="User image"
              width={50}
              height={50}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
