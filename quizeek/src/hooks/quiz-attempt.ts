import { createQuizAttemptAction } from '@/server-actions/quiz-attempt/create-quiz-attempt-action';
import { useMutation } from '@tanstack/react-query';

export const useCreateQuizAttemptMutation = () =>
  useMutation({
    mutationFn: (quizId: string) => createQuizAttemptAction(quizId),
  });
