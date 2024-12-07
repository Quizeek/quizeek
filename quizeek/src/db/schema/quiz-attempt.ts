import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { v7 as uuid } from 'uuid';

import { answers } from './answer';
import { quizes } from './quiz';
import { users } from './user';

export const quizAttempts = sqliteTable('quiz_attempt', {
  id: text('id').primaryKey().$defaultFn(uuid),
  userId: text('user-id').notNull(),
  quizId: text('quiz_id').notNull(),
  timestamp: text('date')
    .notNull()
    .default(sql`(current_timestamp)`),
  score: integer('score'),
});

export const quizAttemptsRelations = relations(
  quizAttempts,
  ({ one, many }) => ({
    user: one(users, {
      fields: [quizAttempts.userId],
      references: [users.id],
    }),
    quiz: one(quizes, {
      fields: [quizAttempts.quizId],
      references: [quizes.id],
    }),
    answers: many(answers),
  })
);
