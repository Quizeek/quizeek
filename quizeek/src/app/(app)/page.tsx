import QuizAuthorBadge from '@/components/quiz/badge/quiz-author-badge';
import { QuizList } from '@/components/quiz/quiz-list/quiz-list';
import { SearchInput } from '@/components/search-input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getActiveQuizes } from '@/db/queries';
import { toNormalizedString } from '@/utils';

type HomeProps = {
  searchParams?: Promise<{
    searchText?: string;
  }>;
};

const Home = async ({ searchParams }: HomeProps) => {
  const searchText = (await searchParams)?.searchText || '';
  const normalizedSearchText = toNormalizedString(searchText);

  const quizes = await getActiveQuizes(normalizedSearchText);

  return (
    <div className="flex flex-col gap-2">
      <div className="md:px-4 py-1">
        <SearchInput
          searchBy="searchText"
          placeholder="Search"
          className="w-full md:w-64"
        />
      </div>

      <ScrollArea className="h-[calc(100dvh-9.25rem)]" type="auto">
        <div className="px-1 pr-4 md:px-4 py-1">
          <QuizList
            quizes={quizes}
            getQuizBadge={(quiz) => <QuizAuthorBadge quiz={quiz} />}
          />
        </div>
      </ScrollArea>
    </div>
  );
};

export default Home;
