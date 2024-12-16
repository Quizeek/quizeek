import { QuizWithUser } from '@/db/schema/quiz';
import Image from 'next/image';
import Link from 'next/link';

import Logo from '../../logo';
import { Card } from '../../ui/card';
import QuizTimeBadge from '../badge/quiz-time-badge';

type QuizListItemProps = {
  quiz: QuizWithUser;
  getQuizBadge: (quiz: QuizWithUser) => React.ReactNode;
};

export const QuizListItem = ({ quiz, getQuizBadge }: QuizListItemProps) => {
  return (
    <Link href={`/quiz/${quiz.id}`}>
      <li>
        <Card className="p-4 flex md:flex-row justify-between flex-col gap-4 hover:cursor-pointer hover:ring-1 hover:ring-ring ">
          <div className="flex md:flex-row gap-4 flex-col">
            {quiz.imageUrl && (
              <Image
                src={quiz.imageUrl}
                alt={quiz.title}
                height={400}
                width={400}
                className="w-24 h-24 rounded-md"
              />
            )}
            {!quiz.imageUrl && <Logo className="w-24 h-24 rounded-md" />}
            <div>
              <h2 className="text-xl font-bold text-foreground">
                {quiz.title}
              </h2>
              <p className="text-foreground line-clamp-3">{quiz.description}</p>
            </div>
          </div>

          <div className="flex md:flex-col justify-between md:max-w-64 items-end shrink-0">
            <QuizTimeBadge quiz={quiz} />
            {getQuizBadge(quiz)}
          </div>
        </Card>
      </li>
    </Link>
  );
};
