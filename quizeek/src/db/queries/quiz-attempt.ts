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
