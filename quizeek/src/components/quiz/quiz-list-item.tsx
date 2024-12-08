'use client';

import Logo from '@/assets/images/logo-square.svg';
import { QuizWithUser } from '@/db/schema/quiz';
import { useFormatters } from '@/hooks';
import { CircleUserRound, Clock } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Card } from '../ui/card';

type QuizListItemProps = {
  quiz: QuizWithUser;
};

export const QuizListItem = ({ quiz }: QuizListItemProps) => {
  const router = useRouter();
  const { toQuizDuration } = useFormatters();

  return (
    <li onClick={() => router.push(`/quiz/${quiz.id}`)}>
      <Card className="p-4 flex md:flex-row justify-between flex-col gap-4 hover:cursor-pointer hover:outline hover:outline-1 hover:outline-secondary">
        <div className="flex md:flex-row gap-4 flex-col">
          <Image
            src={quiz.imageUrl ?? Logo}
            alt={quiz.title}
            className="w-24 h-24 object-cover rounded-md"
          />
          <div>
            <h2 className="text-xl font-bold text-primary">{quiz.title}</h2>
            <p className="text-gray-600 line-clamp-3">{quiz.description}</p>
          </div>
        </div>
        <div className="flex md:flex-col justify-between md:min-w-32 md:max-w-64">
          <span className="text-gray-500 flex items-center gap-1">
            <Clock className="w-6 h-6 text-primary" />
            {toQuizDuration(quiz.timeLimitSeconds)}
          </span>
          <span
            className="text-gray-500 flex items-center gap-1 truncate"
            title={quiz.creator.name ?? ''}
          >
            {quiz.creator.image && (
              <Image
                src={quiz.creator.image}
                alt={quiz.creator.name ?? ''}
                height={100}
                width={100}
                className="w-6 h-6 object-cover rounded-xl border-primary border-2"
              />
            )}
            {!quiz.creator.image && (
              <CircleUserRound className="w-6 h-6 text-primary" />
            )}
            {quiz.creator.name}
          </span>
        </div>
      </Card>
    </li>
  );
};
