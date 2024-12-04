import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core';
import { randomUUID } from 'crypto';
import { relations, sql } from 'drizzle-orm';
import { users } from './user';
import { quizes } from './quiz';
import { answers } from './answer';

export const quizAttempts = sqliteTable('quiz_attempt', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => randomUUID()),
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
