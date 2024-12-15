import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { getMyQuizAttempts } from '@/db/queries';
import { QuizWithUser } from '@/db/schema/quiz';
import { toLocalDateTimeString } from '@/utils';
import { SquareArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type QuizDetailMyAttempsProps = {
  quiz: QuizWithUser;
};

export const QuizDetailMyAttemps = async ({
  quiz,
}: QuizDetailMyAttempsProps) => {
  const attempts = await getMyQuizAttempts(quiz.id);

  return (
    <Card className="pt-2 min-h-80 w-full border">
      <CardTitle className="text-center py-2">My attempts</CardTitle>
      <CardContent className="p-2">
        {attempts.map((attempt) => (
          <div
            key={attempt.id}
            className="flex items-center gap-4 py-2 px-4 odd:bg-secondary"
          >
            <p className="text-sm">
              You scored
              <span className="font-bold">
                {` ${attempt.score ?? 0} ${
                  (attempt.score ?? 0) === 1 ? 'point' : 'points'
                }`}
              </span>
            </p>
            <span className="text-xs ml-auto dark:text-gray-400 text-gray-500 whitespace-nowrap">
              {toLocalDateTimeString(attempt.timestamp)}
            </span>
            <Link
              href={`/auth/quiz/${quiz.id}/view/${attempt.id}`}
              title="View results"
            >
              <SquareArrowRight className="text-primary w-6 h-6" />
            </Link>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
