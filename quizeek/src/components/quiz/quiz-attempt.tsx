'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { QuizWithQuestions } from '@/db/schema/quiz';
import {
  QuizAttemptResponse,
  quizAttemptResponseSchema,
  type QuizAttempt as QuizAttemptType,
} from '@/db/schema/quiz-attempt';
import { useSaveQuizAttemptMutation } from '@/hooks';
import { useQuizTimer } from '@/hooks/quiz-timer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { QuestionList } from './question/question-list';

type QuizAttemptProps = {
  quiz: QuizWithQuestions;
  attempt: QuizAttemptType;
};

export const QuizAttempt = ({ quiz, attempt }: QuizAttemptProps) => {
  const router = useRouter();
  const saveQuizAttempt = useSaveQuizAttemptMutation();

  const { timer, isTimerUp } = useQuizTimer({
    quizTimeLimitSeconds: quiz.timeLimitSeconds,
    attemptTimestamp: attempt.timestamp,
  });

  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<QuizAttemptResponse>({
    resolver: zodResolver(quizAttemptResponseSchema),
    defaultValues: {
      ...quiz.questions.reduce((acc, question) => {
        acc[question.id] = [];
        return acc;
      }, {} as QuizAttemptResponse),
    },
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
    if (isTimerUp) {
      formRef.current?.requestSubmit();
    }
  }, [isTimerUp]);

  return (
    <>
      <h2 className="w-full text-center font-bold">{timer}</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} ref={formRef}>
          <QuestionList
            questions={quiz.questions}
            className="mt-10"
            draggable={false}
          />
          <Button type="submit" className="float-end mt-4">
            Finish
          </Button>
        </form>
      </Form>
    </>
  );
};
