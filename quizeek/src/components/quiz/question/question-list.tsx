'use client';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  QuestionWithChoices,
  type QuestionWithPublicChoices,
} from '@/db/schema/question';
import {
  type QuizAttempt as QuizAttemptType,
  QuizAttemptWithAnswers,
} from '@/db/schema/quiz-attempt';
import { cn } from '@/lib/utils';
import { useState } from 'react';

import { Question as QuestionComponent } from './question';
import { QuestionBubbleList } from './question-bubble-list';

export type QuestionListProps = {
  attempt: QuizAttemptType | QuizAttemptWithAnswers;
  questions: QuestionWithPublicChoices[] | QuestionWithChoices[];
  draggableBubbles: boolean;
  className?: string;
};

export const QuestionList = ({
  questions,
  draggableBubbles,
  className,
  attempt,
}: QuestionListProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentQuestion, setCurrentQuestion] = useState<string>(
    questions.at(0)?.id ?? ''
  );

  return (
    <Carousel
      setApi={setCarouselApi}
      orientation="horizontal"
      className={cn('mt-8 w-full mx-auto basis-24', className)}
      opts={{
        inViewThreshold: 0.5,
        watchDrag: false,
        duration: 0,
      }}
    >
      <QuestionBubbleList
        questions={questions}
        carouselApi={carouselApi}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        draggable={draggableBubbles}
      />
      <CarouselContent>
        {questions.map((question) => (
          <CarouselItem key={question.id}>
            <QuestionComponent question={question} attempt={attempt} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious type="button" className="absolute left-2 -top-4" />
      <CarouselNext type="button" className="absolute right-2 -top-4" />
    </Carousel>
  );
};
