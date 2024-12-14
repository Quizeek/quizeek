import { activateQuizAction } from '@/server-actions/quiz';
import { useMutation } from '@tanstack/react-query';

export const useActivateQuizMutation = () =>
  useMutation({
    mutationFn: activateQuizAction,
  });
