'use client';

import { QuizWithQuestions } from '@/db/schema/quiz';
import { type QuizAttempt as QuizAttemptType } from '@/db/schema/quiz-attempt';
import { zodResolver } from '@hookform/resolvers/zod';
import { DateTime, Duration } from 'luxon';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { QuestionList } from './question/question-list';

type QuizAttemptProps = {
  quiz: QuizWithQuestions;
  attempt: QuizAttemptType;
};

export const QuizAttempt = ({ quiz, attempt }: QuizAttemptProps) => {
  attempt.timestamp = DateTime.now().toSQL();

  const router = useRouter();

  const questionResponseSchema = z.record(z.string(), z.array(z.string()));

  type FormType = z.infer<typeof questionResponseSchema>;

  const form = useForm<FormType>({
    resolver: zodResolver(questionResponseSchema),
    defaultValues: {
      ...quiz.questions.reduce((acc, question) => {
        acc[question.id] = [];
        return acc;
      }, {} as FormType),
    },
  });

  const [timer, setTimer] = useState('');
  const [isTimerUp, setIsTimerUp] = useState(false);

  useEffect(() => {
    if (isTimerUp) {
      router.push(`/auth/quiz/${quiz.id}/view/${attempt.id}`);
    }
  }, [isTimerUp, quiz.id, attempt.id, router]);

  useEffect(() => {
    const startDateTime = DateTime.fromSQL(attempt.timestamp);
    const endDateTime = startDateTime.plus(
      Duration.fromObject({ seconds: quiz.timeLimitSeconds })
    );

    const intervalId = setInterval(() => {
      const currentDateTime = DateTime.now();
      const timeleft = endDateTime.diff(currentDateTime, [
        'hours',
        'minutes',
        'seconds',
      ]);

      console.log('timer');

      if (timeleft.seconds <= 0) {
        setTimer("Time's up!");
        setIsTimerUp(true);
        clearInterval(intervalId);
        return;
      }

      // Format the duration (remove 0h and 0m)
      const formattedTimer = timeleft
        .toFormat("h'h' m'm' s's'")
        .replace(/^0h/, '')
        .replace(/\s0m/, '');

      setTimer(formattedTimer);
    }, 1000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: any): void => {
    // TODO
    console.log(form);
    console.log(data);
  };

  return (
    <>
      <h2 className="w-full text-end font-bold">{timer}</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <QuestionList questions={quiz.questions} className="mt-10" />
          <Button type="submit" className="mt-4 float-end">
            Finish
          </Button>
        </form>
      </Form>
    </>
  );
};
