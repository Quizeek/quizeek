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
import { useState } from 'react';

import { Question as QuestionComponent } from './question';
import { QuestionBubbleList } from './question-bubble-list';

export const QuestionList = () => {
  // TODO: replace with db call
  const [questions, setQuestions] = useState<QuestionWithChoices[]>([
    ...Array.from(
      { length: 30 },
      (_, i) =>
        ({
          id: `random-uuid${i + 1}`,
          quizId: `random-quiz-uuid${i + 1}`,
          text: `Question text${i + 1}`,
          number: i + 1,
          type: i % 2 === 0 ? 'single_choice' : 'multiple_choice',
          choices: Array.from({ length: 4 }, (_, j) => ({
            id: `random-choice-uuid${i}${j + 1}`,
            isCorrect: j === 2,
            points: j === 2 ? 1 : 0,
            questionId: `random-uuid${i + 1}`,
            text: `Choice number ${j + 1}`,
          })),
        }) as QuestionWithChoices
    ),
  ]);

  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentQuestion, setCurrentQuestion] = useState<string>(
    questions.at(0)?.id ?? ''
  );

  return (
    <Carousel
      setApi={setCarouselApi}
      orientation="horizontal"
      className="mt-8 w-full mx-auto"
      opts={{
        inViewThreshold: 0.5,
        watchDrag: false,
        duration: 0,
      }}
    >
      <QuestionBubbleList
        questions={questions}
        setQuestions={setQuestions}
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
      <CarouselPrevious className="absolute left-2 -top-4" />
      <CarouselNext className="absolute right-2 -top-4" />
    </Carousel>
  );
};
