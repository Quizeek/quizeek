import {
  createQuizAttemptAction,
  saveQuizAttemptAction,
} from '@/server-actions';
import { useMutation } from '@tanstack/react-query';

export const useCreateQuizAttemptMutation = () =>
  useMutation({
    mutationFn: (quizId: string) => createQuizAttemptAction(quizId),
  });

export const useSaveQuizAttemptMutation = () =>
  useMutation({
    mutationFn: ({
      quizIdAttemptId,
      choices,
    }: {
      quizIdAttemptId: string;
      choices: string[];
    }) => saveQuizAttemptAction(quizIdAttemptId, choices),
  });
