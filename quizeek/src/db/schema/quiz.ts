import { InferSelectModel, relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { v7 as uuid } from 'uuid';

import { questions } from './question';
import { quizAttempts } from './quiz-attempt';
import { User, users } from './user';

export const quizes = sqliteTable('quiz', {
  id: text('id').primaryKey().$defaultFn(uuid),
  createdBy: text('created_by').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  imageUrl: text('image_url'),
  timeLimitSeconds: integer('time_limit_seconds').notNull(),
  isActive: integer('is_active', { mode: 'boolean' }).notNull(),
});

export const quizesRelations = relations(quizes, ({ one, many }) => ({
  creator: one(users, {
    fields: [quizes.createdBy],
    references: [users.id],
  }),
  quizAttempts: many(quizAttempts),
  questions: many(questions),
}));

export type Quiz = InferSelectModel<typeof quizes>;

export type QuizWithUser = Quiz & { creator: User };
