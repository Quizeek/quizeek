import { QuizWithUser } from '@/db/schema/quiz';

import { QuizListItem } from './quiz-list-item';

type QuizListProps = {
  quizes: QuizWithUser[];
  getQuizBadge: (quiz: QuizWithUser) => React.ReactNode;
};

export const QuizList = ({ quizes, getQuizBadge }: QuizListProps) => {
  return (
    <ul className="gap-3 w-full flex flex-col">
      {quizes.length === 0 && (
        <div className="w-full flex items-center justify-center mt-8">
          <p className="">No quizes found.</p>
        </div>
      )}
      {quizes.map((quiz) => (
        <QuizListItem key={quiz.id} quiz={quiz} getQuizBadge={getQuizBadge} />
      ))}
    </ul>
  );
};
