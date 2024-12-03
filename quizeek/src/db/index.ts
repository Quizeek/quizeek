import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { answers, answersRelations } from './schema/answer';
import { choices, choicesRelations } from './schema/choice';
import { questions, questionsRelations } from './schema/question';
import { quizAttempts, quizAttemptsRelations } from './schema/quiz-attempt';
import { quizes, quizesRelations } from './schema/quiz';
import { users, usersRelations } from './schema/user';

const client = createClient({
  url: process.env.DATABASE_URL ?? '',
  authToken: process.env.AUTH_TOKEN,
});

export const db = drizzle(client, {
  schema: {
    answers,
    choices,
    questions,
    quizAttempts,
    quizes,
    users,

    answersRelations,
    choicesRelations,
    questionsRelations,
    quizAttemptsRelations,
    quizesRelations,
    usersRelations,
  },
});
