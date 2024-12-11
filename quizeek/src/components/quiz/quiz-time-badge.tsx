import { QuizWithUser } from '@/db/schema/quiz';
import { toQuizDuration } from '@/utils';
import { Clock } from 'lucide-react';
import React from 'react';

type QuizTimeBadgeProps = {
  quiz: QuizWithUser;
};

const QuizTimeBadge = ({ quiz }: QuizTimeBadgeProps) => {
  return (
    <span className="text-foreground flex items-center gap-1">
      <Clock className="w-6 h-6 text-primary" />
      {toQuizDuration(quiz.timeLimitSeconds)}
    </span>
  );
};

export default QuizTimeBadge;
