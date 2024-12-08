import { QuizWithUser } from '@/db/schema/quiz';

import { QuizListItem } from './quiz-list-item';

type QuizListProps = {
  quizes: QuizWithUser[];
};

export const QuizList = ({ quizes }: QuizListProps) => {
  return (
    <ul className="space-y-4 px-4 py-2 h-[36rem] overflow-y-auto">
      {quizes.map((quiz) => (
        <QuizListItem key={quiz.id} quiz={quiz} />
      ))}
    </ul>
  );
};
