'use server';

import { db } from '..';
import { QuizWithUser } from '../schema/quiz';

export const getQuizes = async (): Promise<QuizWithUser[]> => {
  try {
    const dbQuizes = await db.query.quizes.findMany({
      with: { creator: true },
    });

    return dbQuizes;
  } catch {
    throw new Error('Failed to load quizes.');
  }
};
