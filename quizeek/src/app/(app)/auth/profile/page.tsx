import UserSettingsForm from '@/components/profile/update-user-form';
import { Card } from '@/components/ui/card';
import React from 'react';

const Page = async () => {
  return (
    <div>
      <Card>
        <UserSettingsForm />
      </Card>
    </div>
  );
};

export default Page;
