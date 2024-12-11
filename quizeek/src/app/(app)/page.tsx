import QuizAuthorBadge from '@/components/quiz/quiz-author-badge';
import { QuizList } from '@/components/quiz/quiz-list';
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
    <div className="flex flex-col gap-3">
      <SearchInput
        searchBy="searchText"
        placeholder="Search"
        className="w-full md:w-64"
      />

      <ScrollArea className="h-[calc(100vh-9rem)]" type="always">
        <QuizList
          quizes={quizes}
          getQuizBadge={(quiz) => <QuizAuthorBadge quiz={quiz} />}
        />
      </ScrollArea>
    </div>
  );
};

export default Home;
