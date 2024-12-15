'use server';

import { auth } from '@/auth';
import { InvalidSessionError } from '@/models';
import { handleError } from '@/utils';
import { and, eq, getTableColumns, like, or } from 'drizzle-orm';

import { db } from '..';
import { EditableQuiz, quizes, QuizWithUser } from '../schema/quiz';
import { quizAttempts } from '../schema/quiz-attempt';
import { users } from '../schema/user';

export const getActiveQuizes = async (
  searchText: string
): Promise<QuizWithUser[]> => {
  try {
    const dbQuizes = await db.query.quizes.findMany({
      where: and(
        or(
          like(quizes.title, `%${searchText}%`),
          like(quizes.description, `%${searchText}%`)
        ),
        eq(quizes.isActive, true)
      ),
      with: { creator: true },
    });

    return dbQuizes;
  } catch (error) {
    throw handleError(error);
  }
};

export const getQuizById = async (
  quizId: string
): Promise<QuizWithUser | undefined> => {
  try {
    const quiz = await db.query.quizes.findFirst({
      where: eq(quizes.id, quizId),
      with: { creator: true },
    });

    return quiz;
  } catch (error) {
    throw handleError(error);
  }
};

export const getMyQuizes = async (
  searchText: string
): Promise<QuizWithUser[]> => {
  try {
    const session = await auth();

    const dbQuizes = await db.query.quizes.findMany({
      where: and(
        or(
          like(quizes.title, `%${searchText}%`),
          like(quizes.description, `%${searchText}%`)
        ),
        eq(quizes.createdBy, session?.user.id ?? '')
      ),
      with: {
        creator: true,
      },
    });

    return dbQuizes;
  } catch (error) {
    throw handleError(error);
  }
};

export const getTakenQuizes = async (
  searchText: string
): Promise<QuizWithUser[]> => {
  try {
    const session = await auth();

    const dbQuizes = await db
      .selectDistinct({
        ...getTableColumns(quizes),
        creator: users,
      })
      .from(quizes)
      .where(
        or(
          like(quizes.title, `%${searchText}%`),
          like(quizes.description, `%${searchText}%`)
        )
      )
      .innerJoin(users, eq(quizes.createdBy, users.id))
      .innerJoin(
        quizAttempts,
        and(
          eq(quizes.id, quizAttempts.quizId),
          eq(quizAttempts.userId, session?.user.id ?? '')
        )
      );

    return dbQuizes;
  } catch (error) {
    throw handleError(error);
  }
};

export const getEditableQuiz = async (id: string): Promise<EditableQuiz> => {
  try {
    const session = await auth();

    const dbQuiz = await db.query.quizes.findFirst({
      where: and(
        eq(quizes.id, id),
        eq(quizes.createdBy, session?.user.id ?? '')
      ),
      with: {
        questions: {
          with: {
            choices: true,
          },
        },
      },
    });

    if (!dbQuiz) {
      throw new InvalidSessionError('User is not creator of the quiz');
    }

    return dbQuiz;
  } catch (error) {
    throw handleError(error);
  }
};
