import { QuizWithUser } from '@/db/schema/quiz';
import { cn } from '@/lib/utils';
import React from 'react';

import { Badge } from '../../ui/badge';

type QuizStatusBadgeProps = {
  quiz: QuizWithUser;
};

const QuizStatusBadge = ({ quiz }: QuizStatusBadgeProps) => {
  return (
    <Badge
      variant="secondary"
      className="flex gap-1 truncate py-1 font-thin w-fit"
    >
      <div className="w-4 h-4 flex items-center justify-center">
        <div
          className={cn(
            'w-2 h-2 rounded-full',
            quiz.isActive && 'bg-primary',
            !quiz.isActive && 'bg-gray-400'
          )}
        ></div>
      </div>

      {quiz.isActive ? 'active' : 'inactive'}
    </Badge>
  );
};

export default QuizStatusBadge;
