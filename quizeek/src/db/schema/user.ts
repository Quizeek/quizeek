import { text, sqliteTable } from 'drizzle-orm/sqlite-core';
import { randomUUID } from 'crypto';
import { relations } from 'drizzle-orm';
import { quizAttempts } from './quiz-attempt';
import { quizes } from './quiz';

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
