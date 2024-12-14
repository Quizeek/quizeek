import { activateQuizAction, submitQuizFormAction } from '@/server-actions';
import { useMutation } from '@tanstack/react-query';

export const useSubmitQuizFormMutation = () =>
  useMutation({
    mutationFn: submitQuizFormAction,
  });

export const useActivateQuizMutation = () =>
  useMutation({
    mutationFn: activateQuizAction,
  });
