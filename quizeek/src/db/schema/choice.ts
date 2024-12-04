import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core';
import { randomUUID } from 'crypto';
import { relations } from 'drizzle-orm';
import { questions } from './question';
import { answers } from './answer';

export const choices = sqliteTable('choice', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => randomUUID()),
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
