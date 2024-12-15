'use client';

import ActionButton from '@/components/action-button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Form } from '@/components/ui/form';
import { QuizForm as QuizFormData, quizFormSchema } from '@/db/schema/quiz';
import { useSubmitQuizFormMutation } from '@/hooks/quiz';
import { useUploadThing } from '@/utils/uploadthing';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import QuizInfoFormPart from './quiz-info-form-part';
import QuizQuestionsFormPart from './quiz-questions-form-part';

const QuizForm = () => {
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<QuizFormData>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      title: '',
      isActive: false,
      questions: [],
    },
  });

  const { startUpload, routeConfig } = useUploadThing('quizImage', {
    onUploadError: () => {
      throw new Error('Failed to upload the file. Please try again.');
    },
  });

  const submitQuizFormMutation = useSubmitQuizFormMutation();

  const onSubmit = async (data: QuizFormData) => {
    await submitQuizFormMutation.mutateAsync(
      { data, file: files[0], startUpload },
      {
        onSuccess: async (quizId) => {
          toast.success('Successfully submitted form');

          redirect(`/quiz/${quizId}`);
        },
        onError: (e) => {
          toast.error(e.message);
        },
      }
    );
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
              <QuizInfoFormPart
                files={files}
                setFiles={setFiles}
                routeConfig={routeConfig}
              />
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

        <ActionButton
          type="submit"
          isLoading={submitQuizFormMutation.isPending}
        >
          Submit
        </ActionButton>
      </form>
    </Form>
  );
};

export default QuizForm;
