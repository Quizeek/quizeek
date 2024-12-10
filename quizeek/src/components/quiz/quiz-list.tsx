import { getFilteredQuizes } from '@/db/queries';

import { ScrollArea } from '../ui/scroll-area';
import { QuizListItem } from './quiz-list-item';

type QuizListProps = {
  searchText: string;
  createdBy?: string;
  onlyActive: boolean;
};

export const QuizList = async ({
  searchText,
  createdBy,
  onlyActive,
}: QuizListProps) => {
  const quizes = await getFilteredQuizes(searchText, onlyActive, createdBy);

  return (
    <ScrollArea className="h-[calc(100vh-9rem)]" type="always">
      <ul className="space-y-4 pr-4 w-full">
        {quizes.map((quiz) => (
          <QuizListItem key={quiz.id} quiz={quiz} />
        ))}
      </ul>
    </ScrollArea>
  );
};
