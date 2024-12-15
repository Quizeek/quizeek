import { auth } from '@/auth';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

const getUserId = async () => {
  const session = await auth();
  return session?.user?.id;
};

export const ourFileRouter = {
  quizImage: f({
    image: { maxFileSize: '4MB', maxFileCount: 1 },
  })
    .middleware(async () => {
      const userId = await getUserId();

      if (!userId) {
        throw new Error('Unauthorized: User not authenticated.');
      }

      return { userId };
    })
    .onUploadComplete(async ({ file }) => {
      return { fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
