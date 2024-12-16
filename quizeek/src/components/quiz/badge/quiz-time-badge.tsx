import { QuizWithUser } from '@/db/schema/quiz';
import { toQuizDuration } from '@/utils';
import { Clock } from 'lucide-react';
import React from 'react';

import { Badge } from '../../ui/badge';

type QuizTimeBadgeProps = {
  quiz: QuizWithUser;
};

const QuizTimeBadge = ({ quiz }: QuizTimeBadgeProps) => {
  return (
    <Badge
      variant="secondary"
      className="flex gap-1 truncate py-1 font-thin w-fit"
    >
      <Clock className="w-4 h-4 text-primary" />
      {toQuizDuration(quiz.timeLimitSeconds)}
    </Badge>
  );
};

export default QuizTimeBadge;
