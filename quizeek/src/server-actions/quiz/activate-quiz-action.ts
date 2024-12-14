'use server';

import { db } from '@/db';
import { quizes } from '@/db/schema/quiz';
import { InvalidDataError } from '@/models';
import { handleServerActionError } from '@/utils';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const activateQuizAction = async (quizId: string): Promise<void> => {
  try {
    const activatedQuiz = await db
      .update(quizes)
      .set({ isActive: true })
      .where(eq(quizes.id, quizId))
      .returning();

    if (activatedQuiz.length !== 1) {
      throw new InvalidDataError('Quiz does not exist');
    }

    revalidatePath(`/quiz/${quizId}`);
  } catch (error) {
    handleServerActionError(error);
  }
};
