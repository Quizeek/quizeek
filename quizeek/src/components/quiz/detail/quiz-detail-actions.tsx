'use client';

import ActionButton from '@/components/action-button';
import { SignInButton } from '@/components/sign-in-button';
import { Button } from '@/components/ui/button';
import { QuizWithUser } from '@/db/schema/quiz';
import { useCreateQuizAttemptMutation, useDeleteQuizMutation } from '@/hooks';
import { User } from 'next-auth';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { QuizActivateDialog } from './quiz-activate-dialog';

type QuizDetailActionsProps = {
  user?: User;
  quiz: QuizWithUser;
};

export const QuizDetailActions = ({ user, quiz }: QuizDetailActionsProps) => {
  const router = useRouter();
  const isOwner = user && quiz.createdBy === user.id;
  const isNotOwner = user && quiz.createdBy !== user.id;

  const createQuizAttempt = useCreateQuizAttemptMutation();

  const deleteQuizMutation = useDeleteQuizMutation();

  const takeQuiz = async () => {
    await createQuizAttempt.mutateAsync(quiz.id, {
      onSuccess: async (attemptId: string) => {
        router.push(`/auth/quiz/${quiz.id}/attempt/${attemptId}`);
      },
      onError: (e) => {
        toast.error(e.message);
      },
    });
  };

  const deleteQuiz = async () => {
    await deleteQuizMutation.mutateAsync(quiz.id, {
      onSuccess: async () => {
        toast.success('Successfully deleted quiz');
        redirect('/auth/profile');
      },
      onError: (e) => {
        toast.error(e.message);
      },
    });
  };

  return (
    <>
      {!user && (
        <SignInButton text="Sign in to quiz me" className="self-end ml-auto" />
      )}

      {!quiz.isActive && isOwner && (
        <div className="self-end ml-auto flex flex-col md:flex-row gap-2">
          <Link href={`/auth/quiz/${quiz.id}/edit`}>
            <Button className="w-20">Edit</Button>
          </Link>
          <QuizActivateDialog quiz={quiz} />
          <ActionButton
            className="w-20"
            variant="destructive"
            onClick={deleteQuiz}
            isLoading={deleteQuizMutation.isPending}
          >
            Delete
          </ActionButton>
        </div>
      )}

      {quiz.isActive && isNotOwner && (
        <ActionButton
          onClick={takeQuiz}
          isLoading={createQuizAttempt.isPending}
          className="self-end ml-auto"
        >
          Take quiz
        </ActionButton>
      )}
    </>
  );
};
