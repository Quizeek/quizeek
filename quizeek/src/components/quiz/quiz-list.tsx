import { QuizWithUser } from '@/db/schema/quiz';

import { QuizListItem } from './quiz-list-item';

type QuizListProps = {
  quizes: QuizWithUser[];
  getQuizBadge: (quiz: QuizWithUser) => React.ReactNode;
};

export const QuizList = ({ quizes, getQuizBadge }: QuizListProps) => {
  return (
    <ul className="space-y-4 pr-4 w-full">
      {quizes.map((quiz) => (
        <QuizListItem key={quiz.id} quiz={quiz} getQuizBadge={getQuizBadge} />
      ))}
    </ul>
  );
};
