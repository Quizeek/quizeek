import { randomUUID } from 'crypto';
import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { questions } from './question';
import { quizAttempts } from './quiz-attempt';
import { users } from './user';

export const quizes = sqliteTable('quiz', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  createdBy: text('created_by').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  imageUrl: text('image_url'),
  timeLimitSeconds: integer('time_limit_seconds').notNull(),
});

export const quizesRelations = relations(quizes, ({ one, many }) => ({
  creator: one(users, {
    fields: [quizes.createdBy],
    references: [users.id],
  }),
  quizAttempts: many(quizAttempts),
  questions: many(questions),
}));
