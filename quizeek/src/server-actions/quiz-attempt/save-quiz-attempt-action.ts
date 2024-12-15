'use server';

import { db } from '@/db';
import { answers } from '@/db/schema/answer';
import { choices } from '@/db/schema/choice';
import { quizAttempts } from '@/db/schema/quiz-attempt';
import { handleError } from '@/utils';
import { eq, inArray } from 'drizzle-orm';
import { z } from 'zod';

export const saveQuizAttemptAction = async (
  quizAttemptId: string,
  choiceIds: string[]
) => {
  const updateScore = async (score: number) => {
    await db
      .update(quizAttempts)
      .set({ score })
      .where(eq(quizAttempts.id, quizAttemptId));
  };
  try {
    if (choiceIds.length === 0) {
      await updateScore(0);
      return;
    }

    const choicesData = await db.query.choices.findMany({
      where: inArray(choices.id, choiceIds),
    });
    const parsedChoiceIds = z.array(z.string()).parse(choiceIds);
    const answersToInsert = parsedChoiceIds.map((choiceId) => ({
      choiceId,
      quizAttemptId,
    }));

    await db.insert(answers).values(answersToInsert);
    await updateScore(
      choicesData.reduce((sum, choice) => sum + choice.points, 0)
    );
  } catch (error) {
    return handleError(error);
  }
};
