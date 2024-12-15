import QuizForm from '@/components/quiz/quiz-form/quiz-form';
import { getEditableQuiz } from '@/db/queries';

type PageParams = {
  params: Promise<{
    quizId: string;
  }>;
};

const Page = async ({ params }: PageParams) => {
  const editableQuiz = await getEditableQuiz((await params).quizId);

  return <QuizForm editableQuiz={editableQuiz} />;
};

export default Page;
