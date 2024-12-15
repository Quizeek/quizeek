import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { QuizForm } from '@/db/schema/quiz';
import { Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { v7 as uuid } from 'uuid';

import { QuestionBubbleList } from '../question/question-bubble-list';
import { QuestionDescription } from '../question/question-description';

const QuizQuestionsFormPart = () => {
  const form = useFormContext<QuizForm>();

  const [questions, setQuestions] = useState(form.getValues('questions') ?? []);

  useEffect(() => {
    form.setValue('questions', questions);
  }, [questions, form]);

  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentQuestion, setCurrentQuestion] = useState<string>(
    questions.at(0)?.id ?? ''
  );

  const addQuestion = () => {
    const newQuestion = {
      id: uuid(),
      number: questions.length + 1,
      text: '',
      choices: [],
    };

    setQuestions([...questions, newQuestion]);
  };

  const addChoice = (questionId: string) => {
    const question = questions.find((q) => q.id === questionId);

    if (!question) {
      return;
    }

    const newChoice = {
      id: uuid(),
      text: '',
      isCorrect: false,
      points: 0,
    };

    const updatedQuestion = {
      ...question,
      choices: [...question.choices, newChoice],
    };

    setQuestions(
      questions.map((q) => (q.id === questionId ? updatedQuestion : q))
    );
  };

  const updateQuestionText = (id: string, text: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, text } : q)));
  };

  const updateChoice = <T,>(
    questionId: string,
    choiceId: string,
    key: string,
    value: T
  ) => {
    setQuestions((questions) =>
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              choices: q.choices.map((c) =>
                c.id === choiceId
                  ? {
                      ...c,
                      [key]: value,
                    }
                  : c
              ),
            }
          : q
      )
    );
  };

  const deleteQuestion = (questionId: string) => {
    setQuestions(
      questions
        .filter((q) => q.id !== questionId)
        .map((q, idx) => ({ ...q, number: idx + 1 }))
    );
  };

  const deleteChoice = (questionId: string, choiceId: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              choices: q.choices.filter((c) => c.id !== choiceId),
            }
          : q
      )
    );
  };

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
      >
        <span
          className={
            'rounded-full border w-6 h-6 text-center hover:bg-primary cursor-pointer overflow-x-auto text-foreground bg-primary dark:text-black'
          }
          onClick={addQuestion}
        >
          +
        </span>
      </QuestionBubbleList>

      <CarouselContent>
        {questions.map((question, questionIdx) => (
          <CarouselItem key={question.id}>
            <div className="p-1">
              <Card>
                <CardContent className="p-4 w-full max-h-[70vh]">
                  <QuestionDescription title={`#${question.number}`}>
                    <div className="p-1">
                      <Label
                        htmlFor={`${question.id}-text`}
                        className="hidden"
                      />
                      <Input
                        name={`${question.id}-text`}
                        value={question.text}
                        placeholder="Question text"
                        onChange={(e) =>
                          updateQuestionText(question.id, e.currentTarget.value)
                        }
                      />

                      <span className="text-destructive">
                        {
                          form.formState.errors.questions?.[questionIdx]?.text
                            ?.message
                        }
                      </span>
                    </div>
                  </QuestionDescription>

                  <ScrollArea
                    type="auto"
                    className="mt-4 flex flex-col max-h-[40vh] pr-4"
                  >
                    <div className="flex flex-col gap-5">
                      {question.choices.map((choice, choiceIdx) => (
                        <Card
                          key={`${question.id}-choice-${choice.id}`}
                          className="w-full py-1 px-1 rounded-md hover:bg-secondary flex gap-2 last:mb-0 items-center md:items-center md:relative flex-col md:flex-row"
                        >
                          <div className="w-full">
                            <Label
                              htmlFor={`${question.id}-choice-${choice.id}-text`}
                              className="hidden"
                            />
                            <Input
                              id={`${question.id}-choice-${choice.id}-text`}
                              name={`${question.id}-choice-${choice.id}-text`}
                              value={choice.text}
                              placeholder="Choice text"
                              onChange={(e) =>
                                updateChoice(
                                  question.id,
                                  choice.id,
                                  'text',
                                  e.currentTarget.value
                                )
                              }
                            />
                            <span className="text-destructive md:absolute md:-bottom-5">
                              {
                                form.formState.errors.questions?.[questionIdx]
                                  ?.choices?.[choiceIdx]?.text?.message
                              }
                            </span>
                          </div>

                          <div className="w-full md:w-fit">
                            <Label
                              htmlFor={`${question.id}-choice-${choice.id}-points`}
                              className="hidden"
                            />
                            <NumericFormat
                              className="w-full md:w-20"
                              customInput={Input}
                              decimalScale={0}
                              placeholder="Points"
                              value={choice.points}
                              onChange={(e) => {
                                updateChoice(
                                  question.id,
                                  choice.id,
                                  'points',
                                  parseInt(e.currentTarget.value)
                                );
                                updateChoice(
                                  question.id,
                                  choice.id,
                                  'isCorrect',
                                  parseInt(e.currentTarget.value) > 0
                                );
                              }}
                            />
                            <span className="text-destructive md:absolute md:-bottom-5">
                              {
                                form.formState.errors.questions?.[questionIdx]
                                  ?.choices?.[choiceIdx]?.points?.message
                              }
                            </span>
                          </div>

                          <div className="flex items-center justify-between md:justify-normal w-full md:w-fit">
                            <div className="flex gap-3 items-center md:w-28">
                              <Switch
                                id={`${question.id}-choice-${choice.id}-isCorrect`}
                                name={`${question.id}-choice-${choice.id}-isCorrect`}
                                checked={choice.isCorrect}
                                onCheckedChange={(v) =>
                                  updateChoice(
                                    question.id,
                                    choice.id,
                                    'isCorrect',
                                    v
                                  )
                                }
                              />
                              <Label
                                className="w-24"
                                htmlFor={`${question.id}-choice-${choice.id}-isCorrect`}
                              >
                                {choice.isCorrect ? 'Correct' : 'Incorrect'}
                              </Label>
                              <span className="text-destructive md:absolute md:-bottom-5">
                                {
                                  form.formState.errors.questions?.[questionIdx]
                                    ?.choices?.[choiceIdx]?.isCorrect?.message
                                }
                              </span>
                            </div>

                            <Trash2
                              onClick={() =>
                                deleteChoice(question.id, choice.id)
                              }
                              className="cursor-pointer text-destructive w-6 h-6"
                            />
                          </div>
                        </Card>
                      ))}

                      {form.formState.errors.questions?.[questionIdx]?.choices
                        ?.message && (
                        <span className="text-destructive">
                          {
                            form.formState.errors.questions?.[questionIdx]
                              ?.choices?.message
                          }
                        </span>
                      )}

                      <div className="w-full flex items-center justify-center gap-4">
                        <Button
                          type="button"
                          onClick={() => addChoice(question.id)}
                        >
                          Add choice
                        </Button>

                        <Button
                          onClick={() => deleteQuestion(question.id)}
                          variant="destructive"
                          type="button"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}

        {form.formState.errors.questions?.message && (
          <span className="text-destructive w-fit mx-4">
            {form.formState.errors.questions?.message}
          </span>
        )}
      </CarouselContent>
      <CarouselPrevious type="button" className="absolute left-2 -top-4" />
      <CarouselNext type="button" className="absolute right-2 -top-4" />
    </Carousel>
  );
};

export default QuizQuestionsFormPart;
