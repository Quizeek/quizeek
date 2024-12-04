import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core';
import { randomUUID } from 'crypto';
import { relations } from 'drizzle-orm';
import { users } from './user';
import { quizAttempts } from './quiz-attempt';
import { questions } from './question';

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
