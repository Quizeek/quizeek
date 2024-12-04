import { randomUUID } from 'crypto';
import { relations } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { quizes } from './quiz';
import { quizAttempts } from './quiz-attempt';

export const users = sqliteTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  // TODO: Auth
});

export const usersRelations = relations(users, ({ many }) => ({
  quizAttempts: many(quizAttempts),
  quizes: many(quizes),
}));
