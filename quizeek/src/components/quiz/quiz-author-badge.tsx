import { QuizWithUser } from '@/db/schema/quiz';
import { CircleUserRound } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

type QuizAuthorBadgeProps = {
  quiz: QuizWithUser;
};

const QuizAuthorBadge = ({ quiz }: QuizAuthorBadgeProps) => {
  return (
    <span
      className="text-foreground flex items-center gap-1 truncate"
      title={quiz.creator.name ?? ''}
    >
      {quiz.creator.image && (
        <Image
          src={quiz.creator.image}
          alt={quiz.creator.name ?? ''}
          height={100}
          width={100}
          className="w-6 h-6 rounded-xl border-foreground border-2"
        />
      )}
      {!quiz.creator.image && (
        <CircleUserRound className="w-6 h-6 text-foreground" />
      )}
      {quiz.creator.name}
    </span>
  );
};

export default QuizAuthorBadge;
