'use server';

import { auth } from '@/auth';
import { InvalidSessionError } from '@/models';
import { handleError } from '@/utils';
import { and, desc, eq, getTableColumns, like, or } from 'drizzle-orm';

import { db } from '..';
import { Choice, PublicChoice } from '../schema/choice';
import {
  EditableQuiz,
  Quiz,
  QuizDetail,
  quizes,
  QuizWithPublicQuestions,
  QuizWithQuestions,
  QuizWithUser,
} from '../schema/quiz';
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
): Promise<QuizDetail | undefined> => {
  try {
    const quiz = await db.query.quizes.findFirst({
      where: eq(quizes.id, quizId),
      with: {
        creator: true,
        questions: {
          with: {
            choices: true,
          },
        },
      },
    });

    if (!quiz) return undefined;

    const maxScore = quiz.questions.reduce((totalScore, question) => {
      const questionScore = question.choices.reduce((choiceScore, choice) => {
        return choice.points > 0 ? choiceScore + choice.points : choiceScore;
      }, 0);
      return totalScore + questionScore;
    }, 0);

    return { ...quiz, maxScore };
  } catch (error) {
    throw handleError(error);
  }
};

export const getQuizWithPublicQuestionsById = async (
  quizId: string
): Promise<QuizWithPublicQuestions | undefined> => {
  try {
    const quiz = await db.query.quizes.findFirst({
      where: eq(quizes.id, quizId),
      with: {
        questions: {
          with: {
            choices: {
              columns: {
                id: true,
                text: true,
                questionId: true,
              },
            },
          },
        },
      },
    });

    return !quiz
      ? quiz
      : {
          ...quiz,
          questions: quiz.questions.map((q) => ({
            ...q,
            choices: q.choices.map((c) => ({
              ...c,
              type: 'public',
            })) as PublicChoice[],
          })),
        };
  } catch {
    throw new Error('Failed to load quiz.');
  }
};

export const getQuizWithQuestionsById = async (
  quizId: string
): Promise<QuizWithQuestions | undefined> => {
  try {
    const quiz = await db.query.quizes.findFirst({
      where: eq(quizes.id, quizId),
      with: {
        questions: {
          with: {
            choices: true,
          },
        },
      },
    });

    return !quiz
      ? quiz
      : {
          ...quiz,
          questions: quiz.questions.map((q) => ({
            ...q,
            choices: q.choices.map((c) => ({
              ...c,
              type: 'private',
            })) as Choice[],
          })),
        };
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
        eq(quizes.createdBy, session?.user.id ?? ''),
        eq(quizes.isActive, false)
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

    return {
      ...dbQuiz,
      questions: dbQuiz.questions.map((q) => ({
        ...q,
        choices: q.choices.map((c) => ({
          ...c,
          type: 'private',
        })) as Choice[],
      })),
    };
  } catch (error) {
    throw handleError(error);
  }
};

export const getTopQuizesByAttempts = async (top: number): Promise<Quiz[]> => {
  try {
    const topQuizes = await db
      .select({ ...getTableColumns(quizes) })
      .from(quizes)
      .leftJoin(quizAttempts, eq(quizAttempts.quizId, quizes.id))
      .groupBy(quizes.id)
      .orderBy(desc(quizAttempts.id))
      .limit(top);

    return topQuizes;
  } catch (error) {
    throw handleError(error);
  }
};
