import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { getOtherQuizAttempts } from '@/db/queries/quiz-attempt';
import { QuizWithUser } from '@/db/schema/quiz';
import { toLocalDateTimeString } from '@/utils/date';
import { CircleUserRound } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

type QuizDetailOtherAttempsProps = {
  quiz: QuizWithUser;
};

export const QuizDetailOtherAttemps = async ({
  quiz,
}: QuizDetailOtherAttempsProps) => {
  const attempts = await getOtherQuizAttempts(quiz.id);

  return (
    <Card className="pt-2 min-h-80 w-full border">
      <CardTitle className="text-center py-2">Other attempts</CardTitle>
      <CardContent className="p-2">
        {attempts.map((attempt) => (
          <div
            key={attempt.id}
            className="flex items-center gap-2 py-2 px-4 odd:bg-secondary "
          >
            {attempt.user.image && (
              <Image
                src={attempt.user.image}
                alt={attempt.user.name ?? ''}
                height={100}
                width={100}
                className="w-6 h-6 rounded-full border-primary border-2"
              />
            )}
            {!attempt.user.image && <CircleUserRound className="w-6 h-6" />}

            <div className="flex flex-1 items-center justify-between">
              <p className="text-sm">
                <span>{attempt.user.name}</span> scored
                <span className="font-bold">
                  {` ${attempt.score ?? 0} ${
                    (attempt.score ?? 0) === 1 ? 'point' : 'points'
                  }`}
                </span>
              </p>
              <span className="text-xs dark:text-gray-400 text-gray-500 whitespace-nowrap">
                {toLocalDateTimeString(attempt.timestamp)}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
