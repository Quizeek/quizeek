'use client';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { type QuestionWithChoices } from '@/db/schema/question';
import { cn } from '@/lib/utils';
import { useState } from 'react';

import { Question as QuestionComponent } from './question';
import { QuestionBubbleList } from './question-bubble-list';

export type QuestionListProps = {
  questions: QuestionWithChoices[];
  className?: string;
};

export const QuestionList = ({ questions, className }: QuestionListProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentQuestion, setCurrentQuestion] = useState<string>(
    questions.at(0)?.id ?? ''
  );

  return (
    <Carousel
      setApi={setCarouselApi}
      orientation="horizontal"
      className={cn('mt-8 w-full mx-auto', className)}
      opts={{
        inViewThreshold: 0.5,
        watchDrag: false,
        duration: 0,
      }}
    >
      <QuestionBubbleList
        questions={questions}
        setQuestions={() => {}}
        carouselApi={carouselApi}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
      />
      <CarouselContent>
        {questions.map((question) => (
          <CarouselItem key={question.id}>
            <QuestionComponent question={question} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious type="button" className="absolute left-2 -top-4" />
      <CarouselNext type="button" className="absolute right-2 -top-4" />
    </Carousel>
  );
};
