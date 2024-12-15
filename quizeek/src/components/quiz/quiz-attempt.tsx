'use client';

import { Form } from '@/components/ui/form';
import { QuizWithPublicQuestions, QuizWithQuestions } from '@/db/schema/quiz';
import {
  QuizAttemptResponse,
  quizAttemptResponseSchema,
  type QuizAttempt as QuizAttemptType,
  QuizAttemptWithAnswers,
} from '@/db/schema/quiz-attempt';
import { useSaveQuizAttemptMutation } from '@/hooks';
import { useQuizTimer } from '@/hooks/quiz-timer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { QuizAttemptSaveDialog } from './attempt/quiz-attempt-save-dialog';
import { QuestionList } from './question/question-list';

type QuizAttemptProps = {
  quiz: QuizWithPublicQuestions | QuizWithQuestions;
  attempt: QuizAttemptType | QuizAttemptWithAnswers;
};

export const QuizAttempt = ({ quiz, attempt }: QuizAttemptProps) => {
  const router = useRouter();
  const saveQuizAttempt = useSaveQuizAttemptMutation();

  const { timer, isTimerUp } = useQuizTimer({
    quizTimeLimitSeconds: quiz.timeLimitSeconds,
    attemptTimestamp: attempt.timestamp,
  });

  const getDefaultValues = () => {
    if (attempt.type === 'base') {
      return {
        ...quiz.questions.reduce((acc, question) => {
          acc[question.id] = [];
          return acc;
        }, {} as QuizAttemptResponse),
      };
    }

    return {
      ...attempt.answers.reduce((acc, answer) => {
        acc[answer.choice.questionId] = [
          ...(acc[answer.choice.questionId] ?? []),
          answer.choiceId,
        ];
        return acc;
      }, {} as QuizAttemptResponse),
    };
  };

  const formRef = useRef<HTMLFormElement | null>(null);
  const form = useForm<QuizAttemptResponse>({
    resolver: zodResolver(quizAttemptResponseSchema),
    defaultValues: getDefaultValues(),
  });

  const onSubmit = async (data: QuizAttemptResponse): Promise<void> => {
    const choices = Object.keys(data).flatMap((key) => data[key]);
    await saveQuizAttempt.mutateAsync(
      { quizIdAttemptId: attempt.id, choices },
      {
        onSuccess: () => {
          toast.success('Your responses were successfully saved.');
          router.push(`/auth/quiz/${quiz.id}/view/${attempt.id}`);
        },
        onError: () =>
          toast.error('Something went wrong while saving your responses.'),
      }
    );
  };

  useEffect(() => {
    if (isTimerUp && attempt.type === 'base') {
      formRef.current?.requestSubmit();
    }
  }, [isTimerUp, attempt]);

  return (
    <>
      <h2 className="w-full text-center font-bold">
        {attempt.type === 'base' ? timer : `${attempt.score}pts`}
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} ref={formRef}>
          <QuestionList
            attempt={attempt}
            questions={quiz.questions}
            className="mt-10"
            draggableBubbles={false}
          />
          {attempt.type === 'base' && (
            <QuizAttemptSaveDialog
              onConfirm={() => formRef.current?.requestSubmit()}
              isPending={saveQuizAttempt.isPending}
            />
          )}
        </form>
      </Form>
    </>
  );
};
