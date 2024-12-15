import { QuizForm } from '@/db/schema/quiz';
import { ClientUploadedFileData } from 'uploadthing/types';

export type SubmitQuizFormMutationType = {
  id?: string;
  data: QuizForm;
  file: File;
  startUpload: (
    files: File[],
    input?: undefined
  ) => Promise<
    | ClientUploadedFileData<{
        fileUrl: string;
      }>[]
    | undefined
  >;
};
