import { getTopQuizesByAttempts } from '@/db/queries';
import { MetadataRoute } from 'next';

export const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const quizes = await getTopQuizesByAttempts(5);

  const quizPaths = quizes.map((quiz) => ({
    url: `https://quizeek.vercel.app/quiz/${quiz.id}`,
    lastModified: new Date().toISOString(),
  }));

  return [
    {
      url: 'https://quizeek.vercel.app/',
      lastModified: new Date().toISOString(),
    },
    {
      url: 'https://quizeek.vercel.app/auth/profile',
      lastModified: new Date().toISOString(),
    },
    {
      url: 'https://quizeek.vercel.app/auth/quiz/create',
      lastModified: new Date().toISOString(),
    },
    ...quizPaths,
  ];
};

export default sitemap;
