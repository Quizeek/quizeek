'use server';

import { and, eq, like, or } from 'drizzle-orm';

import { db } from '..';
import { quizes, QuizWithUser } from '../schema/quiz';

export const getActiveQuizes = async (
  search: string
): Promise<QuizWithUser[]> => {
  try {
    const dbQuizes = await db.query.quizes.findMany({
      where: and(
        or(
          like(quizes.title, `%${search}%`),
          like(quizes.description, `%${search}%`)
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
