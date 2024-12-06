import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth, { NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';

import { db } from './db';

export const authOptions: NextAuthConfig = {
  providers: [GitHub],
  adapter: DrizzleAdapter(db),

  callbacks: {
    session: ({ session, user }) => {
      session.user.id = user.id;
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
