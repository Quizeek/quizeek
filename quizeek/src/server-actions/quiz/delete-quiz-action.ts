'use server';

import { auth } from '@/auth';
import { db } from '@/db';
import { choices } from '@/db/schema/choice';
import { questions } from '@/db/schema/question';
import { quizes } from '@/db/schema/quiz';
import { InvalidDataError, InvalidSessionError } from '@/models';
import { handleError } from '@/utils';
import { and, eq, inArray } from 'drizzle-orm';

export const deleteQuizAction = async (id: string) => {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new InvalidSessionError('Session is invalid');
    }

    return await db.transaction(async (tx) => {
      try {
        const questionsToDelete = await tx.query.questions.findMany({
          where: eq(questions.quizId, id),
        });

        await tx.delete(choices).where(
          inArray(
            choices.questionId,
            questionsToDelete.map((q) => q.id)
          )
        );

        await tx.delete(questions).where(eq(questions.quizId, id));

        const deletedQuiz = await tx
          .delete(quizes)
          .where(and(eq(quizes.id, id), eq(quizes.createdBy, session.user.id)))
          .returning();

        if (deletedQuiz.length !== 1) {
          throw new InvalidDataError('Quiz not found');
        }
      } catch (e) {
        tx.rollback();
        throw e;
      }
    });
  } catch (error) {
    throw handleError(error);
  }
};
