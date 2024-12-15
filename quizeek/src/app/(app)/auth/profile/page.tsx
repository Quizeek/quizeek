import UserQuizOverview from '@/components/profile/user-quiz-overview';
import UserSettingsCard from '@/components/profile/user-settings-card';
import { toNormalizedString } from '@/utils';
import React from 'react';

type PageProps = {
  searchParams?: Promise<{
    searchText?: string;
  }>;
};

export const metadata = {
  title: 'Your Profile | Quizeek App',
  description:
    'View and manage your profile on Quizeek App. Update your information and track your quizes.',
  keywords: ['profile', 'user profile', 'quizeek app', 'account settings'],
  openGraph: {
    title: 'Your Profile | Quizeek App',
    description:
      'View and manage your profile on Quiz App. Update your information and track your quizes.',
    url: 'https://quizeek.vercel.app/auth/profile',
    type: 'profile',
  },
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
