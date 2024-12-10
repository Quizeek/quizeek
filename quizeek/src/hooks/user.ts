import { updateUserAction } from '@/server-actions';
import { useMutation } from '@tanstack/react-query';

export const useUpdateUserMutation = () =>
  useMutation({
    mutationFn: updateUserAction,
  });
