import Loader from '@/components/layout/loader';
import { QuizList } from '@/components/quiz/quiz-list';
import { SearchInput } from '@/components/search-input';
import { toNormalizedString } from '@/utils';
import { Suspense } from 'react';

type HomeProps = {
  searchParams?: Promise<{
    searchText?: string;
  }>;
};

const Home = async ({ searchParams }: HomeProps) => {
  const searchText = (await searchParams)?.searchText || '';
  const normalizedSearchText = toNormalizedString(searchText);

  return (
    <div className="flex flex-col gap-3">
      <SearchInput
        searchBy="searchText"
        placeholder="Search"
        className="w-full md:w-64"
      />

      <Suspense fallback={<Loader />}>
        <QuizList searchText={normalizedSearchText} onlyActive={false} />
      </Suspense>
    </div>
  );
};

export default Home;
