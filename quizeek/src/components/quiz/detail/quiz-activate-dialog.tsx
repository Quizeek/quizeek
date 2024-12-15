import ActionButton from '@/components/action-button';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { QuizWithUser } from '@/db/schema/quiz';
import { useActivateQuizMutation } from '@/hooks';
import React from 'react';
import { toast } from 'sonner';

type QuizActivateDialogProps = {
  quiz: QuizWithUser;
};

export const QuizActivateDialog = ({ quiz }: QuizActivateDialogProps) => {
  const activateQuizMutation = useActivateQuizMutation();

  const onActivateClick = async () => {
    await activateQuizMutation.mutateAsync(quiz.id, {
      onSuccess: async () => {
        toast.success('Successfully activated quiz');
      },
      onError: (e) => {
        toast.error(e.message);
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-20">Activate</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quiz Activation</DialogTitle>
          <DialogDescription className="flex flex-col gap-2">
            <span>Are you sure you want to activate this quiz?</span>
            <ActionButton
              onClick={onActivateClick}
              isLoading={activateQuizMutation.isPending}
              className="w-20 self-end"
            >
              Activate
            </ActionButton>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
