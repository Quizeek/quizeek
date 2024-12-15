import { InferSelectModel, relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { v7 as uuid } from 'uuid';
import { z } from 'zod';

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

export const quizFormSchema = z.object({
  title: z
    .string({ required_error: 'Title can not be empty' })
    .min(1, 'Title can not be empty'),
  description: z.string().optional(),
  duration: z
    .string({
      required_error: 'Duration must be fully entered and can not be zero',
    })
    .refine(
      (duration) =>
        duration !== '0h 00m 00s' &&
        /^[0-9]?h [0-5][0-9]m [0-5][0-9]s$/.test(duration),
      'Duration must be fully entered and can not be zero'
    ),
  imageUrl: z.string().url('Invalid url').optional(),
  isActive: z.boolean(),
  questions: z
    .array(
      z.object({
        id: z.string(),
        number: z.number(),
        text: z
          .string({ required_error: 'Question text can not be empty' })
          .min(1, 'Question text can not be empty'),
        choices: z
          .array(
            z.object({
              id: z.string(),
              text: z
                .string({ required_error: 'Choice text can not be empty' })
                .min(1, 'Choice text can not be empty'),
              isCorrect: z.boolean(),
              points: z
                .number({
                  required_error: 'Choice points can not be empty',
                  invalid_type_error: 'Choice points can not be empty',
                })
                .min(-4, 'Choice points must be <-4, 4>')
                .max(4, 'Choice points must be <-4, 4>'),
            })
          )
          .min(2, 'Question must have at least 2 choices')
          .refine(
            (choices) => choices.filter((c) => c.isCorrect).length > 0,
            'There must be at least 1 correct choice'
          ),
      })
    )
    .min(1, 'Quiz must have at least 1 question'),
});

export type QuizForm = z.infer<typeof quizFormSchema>;
