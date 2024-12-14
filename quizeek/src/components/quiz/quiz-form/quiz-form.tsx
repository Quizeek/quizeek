'use client';

import SubmitButton from '@/components/form/submit-button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Form } from '@/components/ui/form';
import { QuizForm as QuizFormData, quizFormSchema } from '@/db/schema/quiz';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

import QuizInfoFormPart from './quiz-info-form-part';
import QuizQuestionsFormPart from './quiz-questions-form-part';

const QuizForm = () => {
  const form = useForm<QuizFormData>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      title: '',
      isActive: false,
      questions: [],
    },
  });

  const onSubmit = async (data: QuizFormData) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <Accordion type="multiple" defaultValue={['quiz info']}>
          <AccordionItem
            value="quiz info"
            className="border px-4 py-2 rounded-xl mb-4"
          >
            <AccordionTrigger className="hover:no-underline text-xl font-semibold">
              Quiz info
            </AccordionTrigger>
            <AccordionContent>
              <QuizInfoFormPart />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="questions"
            className="border px-4 py-2 rounded-xl"
          >
            <AccordionTrigger className="hover:no-underline text-xl font-semibold">
              Questions
            </AccordionTrigger>
            <AccordionContent>
              <QuizQuestionsFormPart />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <SubmitButton isLoading={false}>Create</SubmitButton>
      </form>
    </Form>
  );
};

export default QuizForm;
