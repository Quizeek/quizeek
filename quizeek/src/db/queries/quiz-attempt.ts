import { auth } from '@/auth';
import { InvalidSessionError } from '@/models';
import { handleError } from '@/utils';
import {
  and,
  desc,
  eq,
  getTableColumns,
  isNotNull,
  lt,
  ne,
  or,
  sql,
} from 'drizzle-orm';
import { DateTime, Duration } from 'luxon';

import { db } from '..';
import { quizes } from '../schema/quiz';
import {
  QuizAttempt,
  quizAttempts,
  QuizAttemptWithAnswers,
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
          or(
            lt(
              sql`DATETIME(quiz_attempt.date, '+' || quiz.time_limit_seconds || ' seconds')`,
              sql`CURRENT_TIMESTAMP`
            ),
            isNotNull(quizAttempts.score)
          )
        )
      )
      .orderBy(desc(quizAttempts.timestamp));

    // adding 1hr because of drizzle sqlite timestamp bug
    return myQuizAttempts.map((a) => ({
      ...a,
      type: 'base',
      timestamp:
        DateTime.fromSQL(a.timestamp)
          .plus(
            Duration.fromObject({
              hour: 1,
            })
          )
          .toSQL() ?? a.timestamp,
    }));
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
          or(
            lt(
              sql`DATETIME(quiz_attempt.date, '+' || quiz.time_limit_seconds || ' seconds')`,
              sql`CURRENT_TIMESTAMP`
            ),
            isNotNull(quizAttempts.score)
          )
        )
      )
      .orderBy(sql`${quizAttempts.timestamp} desc`);

    // adding 1hr because of drizzle sqlite timestamp bug
    return otherQuizAttempts.map((a) => ({
      ...a,
      type: 'base',
      timestamp:
        DateTime.fromSQL(a.timestamp)
          .plus(
            Duration.fromObject({
              hour: 1,
            })
          )
          .toSQL() ?? a.timestamp,
    }));
  } catch (error) {
    throw handleError(error);
  }
};

export const getQuizAttemptById = async (
  attemptId: string
): Promise<QuizAttempt | undefined> => {
  try {
    const quizAttempt = await db.query.quizAttempts.findFirst({
      where: eq(quizAttempts.id, attemptId),
    });

    return quizAttempt ? { ...quizAttempt, type: 'base' } : quizAttempt;
  } catch (error) {
    throw handleError(error);
  }
};

export const getQuizAttemptWithAnswers = async (
  attemptId: string
): Promise<QuizAttemptWithAnswers> => {
  try {
    const session = await auth();

    const quizAttempt = await db.query.quizAttempts.findFirst({
      where: and(
        eq(quizAttempts.id, attemptId),
        eq(quizAttempts.userId, session?.user.id ?? '')
      ),
      with: {
        answers: {
          with: {
            choice: true,
          },
        },
      },
    });

    if (!quizAttempt) {
      throw new InvalidSessionError('Attempt does not belong to the user');
    }

    return {
      ...quizAttempt,
      type: 'with_answers',
      answers: quizAttempt.answers.map((a) => ({
        ...a,
        choice: {
          ...a.choice,
          type: 'private',
        },
      })),
    };
  } catch (error) {
    throw handleError(error);
  }
};
