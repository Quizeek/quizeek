import { auth } from '@/auth';
import { handleError } from '@/utils';
import { and, eq, getTableColumns, lt, ne, sql } from 'drizzle-orm';

import { db } from '..';
import { quizes } from '../schema/quiz';
import {
  QuizAttempt,
  quizAttempts,
  QuizAttemptWithUser,
} from '../schema/quiz-attempt';
import { users } from '../schema/user';
import { getQuizById } from './quiz';

export const getMyQuizAttempts = async (
  quizId: string
): Promise<QuizAttempt[]> => {
  try {
    const session = await auth();

    const myQuizAttempts = await db
      .select({
        ...getTableColumns(quizAttempts),
      })
      .from(quizAttempts)
      .leftJoin(quizes, eq(quizAttempts.quizId, quizes.id))
      .where(
        and(
          eq(quizes.id, quizId),
          eq(quizAttempts.userId, session?.user.id ?? ''),
          lt(
            sql`DATETIME(quiz_attempt.date, '+' || quiz.time_limit_seconds || ' seconds')`,
            sql`CURRENT_TIMESTAMP`
          )
        )
      )
      .orderBy(sql`${quizAttempts.timestamp} desc`);

    return myQuizAttempts;
  } catch (error) {
    throw handleError(error);
  }
};

export const getOtherQuizAttempts = async (
  quizId: string
): Promise<QuizAttemptWithUser[]> => {
  try {
    const session = await auth();

    const otherQuizAttempts = await db
      .select({
        ...getTableColumns(quizAttempts),
        user: users,
      })
      .from(quizAttempts)
      .innerJoin(quizes, eq(quizAttempts.quizId, quizes.id))
      .innerJoin(users, eq(quizAttempts.userId, users.id))
      .where(
        and(
          eq(quizes.id, quizId),
          ne(quizAttempts.userId, session?.user.id ?? ''),
          lt(
            sql`DATETIME(quiz_attempt.date, '+' || quiz.time_limit_seconds || ' seconds')`,
            sql`CURRENT_TIMESTAMP`
          )
        )
      )
      .orderBy(sql`${quizAttempts.timestamp} desc`);

    return otherQuizAttempts;
  } catch (error) {
    throw handleError(error);
  }
};

export const createQuizAttempt = async (
  quizId: string
): Promise<QuizAttempt | undefined> => {
  const session = await auth();

  try {
    const quiz = await getQuizById(quizId);

    if (!quiz) {
      throw new Error('Quiz does not exist.');
    }

    const quizAttempt = await db
      .insert(quizAttempts)
      .values({
        userId: session?.user.id ?? '',
        quizId: quizId,
      })
      .returning();

    return quizAttempt[0];
  } catch {
    throw new Error('Failed to create quiz attempt.');
  }
};

export const getQuizAttemptById = async (
  quizId: string
): Promise<QuizAttempt | undefined> => {
  try {
    const quizAttempt = await db.query.quizAttempts.findFirst({
      where: eq(quizes.id, quizId),
    });

    return quizAttempt;
  } catch {
    throw new Error('Failed to load quiz attempt.');
  }
};
