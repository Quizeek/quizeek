'use server';

import { auth } from '@/auth';
import { and, eq, getTableColumns, like, or } from 'drizzle-orm';

import { db } from '..';
import { quizes, QuizWithUser } from '../schema/quiz';
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
  } catch {
    throw new Error('Failed to load quizes.');
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
  } catch {
    throw new Error('Failed to load quiz.');
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
  } catch {
    throw new Error('Failed to load quizes.');
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
  } catch {
    throw new Error('Failed to load quizes.');
  }
};
