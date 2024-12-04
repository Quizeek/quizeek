import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import { relations } from 'drizzle-orm';
import { quizes } from './quiz';
import { choices } from './choice';

const questionType = z.enum(['single_choice', 'multiple_choice']);

export const questions = sqliteTable('question', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  quizId: text('quiz_id').notNull(),
  number: integer('number').notNull(),
  text: text('text'),
  type: text('type', { enum: questionType.options }).notNull(),
});

export const questionsRelations = relations(questions, ({ one, many }) => ({
  quiz: one(quizes, {
    fields: [questions.quizId],
    references: [quizes.id],
  }),
  choices: many(choices),
}));
