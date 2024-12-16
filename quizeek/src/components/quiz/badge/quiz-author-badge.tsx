import { QuizWithUser } from '@/db/schema/quiz';
import { CircleUserRound } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { Badge } from '../../ui/badge';

type QuizAuthorBadgeProps = {
  quiz: QuizWithUser;
};

const QuizAuthorBadge = ({ quiz }: QuizAuthorBadgeProps) => {
  return (
    <Badge
      variant="secondary"
      className="flex gap-1 truncate py-1 font-thin w-fit"
      title={quiz.creator.name ?? ''}
    >
      {quiz.creator.image && (
        <Image
          src={quiz.creator.image}
          alt={quiz.creator.name ?? ''}
          height={100}
          width={100}
          className="w-4 h-4 rounded-full border-primary border-2"
        />
      )}
      {!quiz.creator.image && <CircleUserRound className="w-4 h-4" />}
      {quiz.creator.name}
    </Badge>
  );
};

export default QuizAuthorBadge;
