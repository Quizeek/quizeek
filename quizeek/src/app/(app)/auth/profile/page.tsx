import UserQuizOverview from '@/components/profile/user-quiz-overview';
import UserSettingsCard from '@/components/profile/user-settings-card';
import { toNormalizedString } from '@/utils';
import React from 'react';

type PageProps = {
  searchParams?: Promise<{
    searchText?: string;
  }>;
};

const Page = async ({ searchParams }: PageProps) => {
  const searchText = (await searchParams)?.searchText || '';
  const normalizedSearchText = toNormalizedString(searchText);

  return (
    <div className="flex flex-col gap-3">
      <UserSettingsCard />
      <UserQuizOverview searchText={normalizedSearchText} />
    </div>
  );
};

export default Page;
