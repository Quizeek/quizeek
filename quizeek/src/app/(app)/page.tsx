import { QuizList } from '@/components/quiz/quiz-list';
import { getQuizes } from '@/db/queries';
import { Loader } from 'lucide-react';
import { Suspense } from 'react';

const Home = async () => {
  const quizes = await getQuizes();

  return (
    <Suspense fallback={<Loader className="animate-spin" />}>
      <QuizList quizes={quizes} />
    </Suspense>
  );
};

export default Home;
