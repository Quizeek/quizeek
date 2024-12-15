'use server';

import { auth } from '@/auth';
import { db } from '@/db';
import { quizAttempts } from '@/db/schema/quiz-attempt';
import { handleError } from '@/utils';

export const createQuizAttemptAction = async (
  quizId: string
): Promise<string> => {
  try {
    const session = await auth();

    const createdQuiz = await db
      .insert(quizAttempts)
      .values({ quizId, userId: session?.user.id ?? '' })
      .returning();

    return createdQuiz[0].id;
  } catch (error) {
    throw handleError(error);
  }
};
