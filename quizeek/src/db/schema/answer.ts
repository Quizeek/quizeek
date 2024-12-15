import { InferSelectModel, relations } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { v7 as uuid } from 'uuid';

import { Choice, choices } from './choice';
import { quizAttempts } from './quiz-attempt';

export const answers = sqliteTable('answer', {
  id: text('id').primaryKey().$defaultFn(uuid),
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

type Answer = InferSelectModel<typeof answers>;

export type AnswerWithChoice = Answer & { choice: Choice };
