'use server';

import { auth } from '@/auth';
import { db } from '@/db';
import { choices } from '@/db/schema/choice';
import { questions, QuestionType } from '@/db/schema/question';
import { quizes, QuizForm, quizFormSchema } from '@/db/schema/quiz';
import { InvalidDataError, InvalidSessionError } from '@/models';
import { handleError } from '@/utils';
import { and, eq, inArray } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const submitQuizFormAction = async (body: QuizForm, id?: string) => {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new InvalidSessionError('Session is invalid');
    }

    const {
      duration,
      questions: questionsData,
      ...data
    } = await quizFormSchema.parseAsync(body);

    const durationHours = parseInt(duration.substring(0, 1));
    const durationMinutes = parseInt(duration.substring(3, 5));
    const durationSeconds = parseInt(duration.substring(7, 9));

    const timeLimitSeconds =
      durationHours * 3600 + durationMinutes * 60 + durationSeconds;

    return await db.transaction(async (tx) => {
      try {
        if (id) {
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
            .where(
              and(eq(quizes.id, id), eq(quizes.createdBy, session.user.id))
            )
            .returning();

          if (deletedQuiz.length !== 1) {
            throw new InvalidDataError('Quiz not found');
          }
        }

        const quizToCreate = {
          createdBy: session.user.id,
          timeLimitSeconds,
          ...data,
        };

        const newQuiz = await tx
          .insert(quizes)
          .values(quizToCreate)
          .returning();

        if (newQuiz.length !== 1) {
          throw new InvalidDataError('Could not create quiz');
        }

        const questionsToCreate = questionsData.map(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ({ id: _, choices: choicesData, ...questionData }) => ({
            ...questionData,
            quizId: newQuiz[0].id,
            type:
              choicesData.filter((c) => c.isCorrect).length > 1
                ? 'multiple_choice'
                : ('single_choice' as QuestionType),
          })
        );

        const newQuestions = await tx
          .insert(questions)
          .values(questionsToCreate)
          .returning();

        if (newQuestions.length !== questionsToCreate.length) {
          throw new InvalidDataError('Could not create questions');
        }

        const choicesToCreate = questionsData.flatMap((questionData) =>
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          questionData.choices.map(({ id: _, ...choiceData }) => ({
            ...choiceData,
            questionId:
              newQuestions.find((q) => q.number === questionData.number)?.id ??
              '',
          }))
        );

        const newChoices = await tx
          .insert(choices)
          .values(choicesToCreate)
          .returning();

        if (
          newChoices.length !== questionsData.flatMap((q) => q.choices).length
        ) {
          throw new InvalidDataError('Could not create choices');
        }

        revalidatePath('/');

        return newQuiz[0].id;
      } catch (e) {
        tx.rollback();
        throw e;
      }
    });
  } catch (error) {
    throw handleError(error);
  }
};
