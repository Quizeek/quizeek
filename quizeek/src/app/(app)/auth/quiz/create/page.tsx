import QuizForm from '@/components/quiz/quiz-form/quiz-form';

export const metadata = {
  title: 'Create a Quiz',
  description:
    'Build your own quiz using our simple and powerful quiz creation tools. Share your quiz with friends or students!',
  keywords: ['create quiz', 'quiz builder', 'make a quiz', 'quizeek app'],
  openGraph: {
    title: 'Create a Quiz',
    description:
      'Build your own quiz using our simple and powerful quiz creation tools. Share your quiz with friends or students!',
    url: 'https://quizeek.vercel.app/auth/quiz/create',
    type: 'website',
  },
};

const Page = () => {
  return <QuizForm />;
};

export default Page;
