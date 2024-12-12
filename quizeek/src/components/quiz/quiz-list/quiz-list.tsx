import { QuizWithUser } from '@/db/schema/quiz';

import { ScrollArea } from '../../ui/scroll-area';
import { QuizListItem } from './quiz-list-item';

type QuizListProps = {
  quizes: QuizWithUser[];
  getQuizBadge: (quiz: QuizWithUser) => React.ReactNode;
};

export const QuizList = ({ quizes, getQuizBadge }: QuizListProps) => {
  return (
    <ul className="gap-3 w-full flex flex-col">
      {quizes.map((quiz) => (
        <QuizListItem key={quiz.id} quiz={quiz} getQuizBadge={getQuizBadge} />
      ))}
    </ul>
  );
};
