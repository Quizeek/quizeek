import { InferSelectModel, relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { v7 as uuid } from 'uuid';

import { answers } from './answer';
import { questions } from './question';

export const choices = sqliteTable('choice', {
  id: text('id').primaryKey().$defaultFn(uuid),
  questionId: text('question_id').notNull(),
  isCorrect: integer('is_correct', { mode: 'boolean' }).notNull(),
  points: integer('points').notNull(),
  text: text('text').notNull(),
});

export const choicesRelations = relations(choices, ({ one, many }) => ({
  question: one(questions, {
    fields: [choices.questionId],
    references: [questions.id],
  }),
  answers: many(answers),
}));

export type Choice = InferSelectModel<typeof choices>;

export type PublicChoice = Omit<Choice, 'points' | 'isCorrect'>;
