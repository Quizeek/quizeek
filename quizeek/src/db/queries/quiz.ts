'use server';

import { and, eq, like, or } from 'drizzle-orm';

import { db } from '..';
import { quizes, QuizWithUser } from '../schema/quiz';

export const getFilteredQuizes = async (
  search: string,
  onlyActive: boolean,
  createdBy?: string
): Promise<QuizWithUser[]> => {
  try {
    const whereClause = and(
      or(
        like(quizes.title, `%${search}%`),
        like(quizes.description, `%${search}%`)
      ),
      ...(onlyActive ? [eq(quizes.isActive, true)] : []),
      ...(createdBy ? [like(quizes.createdBy, `%${createdBy}%`)] : [])
    );

    const dbQuizes = await db.query.quizes.findMany({
      where: whereClause,
      with: { creator: true },
    });

    return dbQuizes;
  } catch {
    throw new Error('Failed to load quizes.');
  }
};
