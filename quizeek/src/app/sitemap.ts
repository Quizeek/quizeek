import { getTopQuizesByAttempts } from '@/db/queries';
import { Quiz } from '@/db/schema/quiz';
import { MetadataRoute } from 'next';

export const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  let quizes: Quiz[] = [];
  try {
    quizes = await getTopQuizesByAttempts(5);
  } catch {
    // eslint-disable-next-line no-console
    console.warn(
      'Failed to fetch quizes, this might be due to invalid env settings defaulting to an empty list.'
    );
  }

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
