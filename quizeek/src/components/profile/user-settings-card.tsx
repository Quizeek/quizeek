'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

import Loader from '../layout/loader';
import { Card } from '../ui/card';
import UpdateUserForm from './update-user-form';

const UserSettingsCard = () => {
  const session = useSession();

  if (session.status === 'unauthenticated') {
    redirect('/');
  }

  return (
    <Card className="p-3">
      {session.status === 'loading' && <Loader />}
      {session.status === 'authenticated' && (
        <UpdateUserForm session={session} />
      )}
    </Card>
  );
};

export default UserSettingsCard;
