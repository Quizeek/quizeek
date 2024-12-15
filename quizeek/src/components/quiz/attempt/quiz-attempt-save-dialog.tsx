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
import React from 'react';

type QuizAttemptSaveDialogProps = {
  onConfirm: () => void;
  isPending: boolean;
};

export const QuizAttemptSaveDialog = ({
  onConfirm,
  isPending,
}: QuizAttemptSaveDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild className="float-right">
        <Button type="button">Finish</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quiz Submission</DialogTitle>
          <DialogDescription className="flex flex-col gap-2">
            <span>
              Are you sure you want to finish the quiz ans submit your answers?
            </span>
            <ActionButton
              type="submit"
              onClick={onConfirm}
              isLoading={isPending}
              className="w-20 self-end"
            >
              Finish
            </ActionButton>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
