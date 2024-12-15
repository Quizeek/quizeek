import { SubmitQuizFormMutationType } from '@/models';
import { activateQuizAction, submitQuizFormAction } from '@/server-actions';
import { useMutation } from '@tanstack/react-query';

export const useSubmitQuizFormMutation = () =>
  useMutation({
    mutationFn: async ({
      id,
      data,
      file,
      startUpload,
    }: SubmitQuizFormMutationType) => {
      if (file) {
        const uploadedFiles = await startUpload([file]);
        if (uploadedFiles && uploadedFiles[0]?.url) {
          data.imageUrl = uploadedFiles[0].url;
        } else {
          throw new Error('File upload failed.');
        }
      }

      return await submitQuizFormAction(data, id);
    },
  });

export const useActivateQuizMutation = () =>
  useMutation({
    mutationFn: activateQuizAction,
  });
