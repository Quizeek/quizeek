import { CarouselApi } from '@/components/ui/carousel';
import { QuestionBubbleType } from '@/models';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { Dispatch, PropsWithChildren, SetStateAction } from 'react';

import { QuestionBubble } from './question-bubble';

type QuestionBubbleListProps<TQuestion extends QuestionBubbleType> = {
  questions: TQuestion[];
  setQuestions?: Dispatch<SetStateAction<TQuestion[]>>;
  currentQuestion: string;
  setCurrentQuestion: Dispatch<SetStateAction<string>>;
  carouselApi: CarouselApi;
  draggable: boolean;
} & PropsWithChildren;

export const QuestionBubbleList = <TQuestion extends QuestionBubbleType>({
  questions,
  setQuestions,
  currentQuestion,
  setCurrentQuestion,
  carouselApi,
  children,
  draggable,
}: QuestionBubbleListProps<TQuestion>) => {
  carouselApi?.on('slidesInView', (e) => {
    const slides = e.slidesInView();

    if (slides.length !== 1) {
      return;
    }

    const currentId = slides.at(0) ?? 0;

    const question = questions?.[currentId];

    setCurrentQuestion(question?.id ?? '');
  });

  const reorderQuestions = (e: DragEndEvent) => {
    if (!e.over || e.active.id === e.over.id) {
      return;
    }

    setQuestions?.((questions) => {
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
              draggable={draggable}
            />
          ))}
          {children}
        </SortableContext>
      </DndContext>
    </div>
  );
};
