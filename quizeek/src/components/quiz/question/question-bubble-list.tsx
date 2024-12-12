import { CarouselApi } from '@/components/ui/carousel';
import { Question } from '@/db/schema/question';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { Dispatch, SetStateAction } from 'react';

import { QuestionBubble } from './question-bubble';

type QuestionBubbleListProps = {
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
  currentQuestion: number;
  setCurrentQuestion: Dispatch<SetStateAction<number>>;
  carouselApi: CarouselApi;
};

export const QuestionBubbleList = ({
  questions,
  setQuestions,
  currentQuestion,
  setCurrentQuestion,
  carouselApi,
}: QuestionBubbleListProps) => {
  carouselApi?.on('slidesInView', (e) => {
    const slides = e.slidesInView();

    if (slides.length !== 1) {
      return;
    }

    const currentId = slides.at(0) ?? 0;
    setCurrentQuestion(currentId + 1);
  });

  const reorderQuestions = (e: DragEndEvent) => {
    if (!e.over || e.active.id === e.over.id) {
      return;
    }

    setQuestions((questions) => {
      const oldIdx = questions.findIndex((q) => q.id === e.active.id);
      const newIdx = questions.findIndex((q) => q.id === e.over?.id);

      return arrayMove(questions, oldIdx, newIdx).map((q, i) => ({
        ...q,
        number: i + 1,
      }));
    });
  };

  return (
    <div className="flex flex-wrap gap-1 py-2 px-2 justify-center">
      <DndContext onDragEnd={reorderQuestions}>
        <SortableContext items={questions}>
          {questions.map((q) => (
            <QuestionBubble
              key={q.id}
              question={q}
              carouselApi={carouselApi}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
            ></QuestionBubble>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};
