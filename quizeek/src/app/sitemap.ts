import { MetadataRoute } from 'next';

export const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
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
  ];
};

export default sitemap;
