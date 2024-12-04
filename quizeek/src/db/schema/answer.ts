import { text, sqliteTable } from 'drizzle-orm/sqlite-core';
import { randomUUID } from 'crypto';
import { relations } from 'drizzle-orm';
import { quizAttempts } from './quiz-attempt';
import { choices } from './choice';

export const answers = sqliteTable('answer', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  quizAttemptId: text('quiz_attempt_id').notNull(),
  choiceId: text('choice_id').notNull(),
});

export const answersRelations = relations(answers, ({ one }) => ({
  quizAttempt: one(quizAttempts, {
    fields: [answers.quizAttemptId],
    references: [quizAttempts.id],
  }),
  choice: one(choices, {
    fields: [answers.choiceId],
    references: [choices.id],
  }),
}));
