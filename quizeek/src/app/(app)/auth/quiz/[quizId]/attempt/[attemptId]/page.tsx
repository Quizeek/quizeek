import { QuizAttempt } from '@/components/quiz/quiz-attempt';
import { getQuizWithQuestionsById } from '@/db/queries';
import { createQuizAttempt } from '@/db/queries/quiz-attempt';
import { notFound } from 'next/navigation';
import React from 'react';

type AttemptPageProps = {
  params?: Promise<{
    quizId?: string;
    attemptId?: string;
  }>;
};

const Page = async ({ params }: AttemptPageProps) => {
  //   // TODO: replace with db call
  //   const questions = Array.from(
  //     { length: 5 },
  //     (_, i) =>
  //       ({
  //         id: `random-uuid${i + 1}`,
  //         quizId: `random-quiz-uuid${i + 1}`,
  //         text: `Question text${i + 1}`,
  //         number: i + 1,
  //         type: i % 2 === 0 ? 'single_choice' : 'multiple_choice',
  //         choices: Array.from({ length: 4 }, (_, j) => ({
  //           id: `random-choice-uuid${i}${j + 1}`,
  //           isCorrect: j === 2,
  //           points: j === 2 ? 1 : 0,
  //           questionId: `random-uuid${i + 1}`,
  //           text: `Choice number ${j + 1}`,
  //         })),
  //       }) as QuestionWithChoices
  //   );

  const routeParams = await params;

  if (!routeParams?.quizId || !routeParams.attemptId) {
    notFound();
  }

  const quiz = await getQuizWithQuestionsById(routeParams.quizId);
  const attempt = await createQuizAttempt(routeParams.quizId);

  if (!quiz || !attempt) {
    return notFound();
  }

  //   quiz.questions = questions;

  return (
    <>
      <h1 className="text-xl font-bold">{quiz.title}</h1>
      <QuizAttempt quiz={quiz} attempt={attempt} />
    </>
  );
};

export default Page;
