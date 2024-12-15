import { QuizAttempt } from '@/components/quiz/quiz-attempt';
import {
  getQuizAttemptWithAnswers,
  getQuizWithQuestionsById,
} from '@/db/queries';
import { notFound } from 'next/navigation';

type PageProps = {
  params?: Promise<{
    quizId?: string;
    attemptId?: string;
  }>;
};

const Page = async ({ params }: PageProps) => {
  const routeParams = await params;

  if (!routeParams?.quizId || !routeParams.attemptId) {
    notFound();
  }

  const quiz = await getQuizWithQuestionsById(routeParams.quizId);
  const attempt = await getQuizAttemptWithAnswers(routeParams.attemptId);

  if (!quiz || !attempt) {
    return notFound();
  }

  return (
    <>
      <h1 className="text-xl font-bold">{quiz.title}</h1>
      <QuizAttempt quiz={quiz} attempt={attempt} />
    </>
  );
};

export default Page;
