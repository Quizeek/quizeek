import { QuizDetail } from '@/db/schema/quiz';
import React from 'react';

import { Badge } from '../../ui/badge';

type QuizScoreBadgeProps = {
  quiz: QuizDetail;
};

const QuizScoreBadge = ({ quiz }: QuizScoreBadgeProps) => {
  return (
    <Badge
      variant="secondary"
      className="flex gap-1 truncate py-1 font-thin w-fit"
    >
      <p className="h-4 text-foreground">
        Max score:{' '}
        <span className="text-primary font-bold">{quiz.maxScore}</span>
      </p>
    </Badge>
  );
};

export default QuizScoreBadge;
