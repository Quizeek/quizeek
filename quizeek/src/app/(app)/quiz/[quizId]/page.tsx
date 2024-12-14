import { auth } from '@/auth';
import { QuizDetail } from '@/components/quiz/detail/quiz-detail';
import { getQuizById } from '@/db/queries';
import { notFound } from 'next/navigation';

type PageParams = {
  params: Promise<{
    quizId: string;
  }>;
};

const Page = async ({ params }: PageParams) => {
  const quiz = await getQuizById((await params)?.quizId);
  const session = await auth();
  const user = session?.user;

  if (!quiz || ((!user || user.id !== quiz.createdBy) && !quiz.isActive)) {
    notFound();
  }

  return <QuizDetail quiz={quiz} />;
};

export default Page;
