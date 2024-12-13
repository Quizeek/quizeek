import { CarouselApi } from '@/components/ui/carousel';
import { Question } from '@/db/schema/question';
import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Dispatch, SetStateAction } from 'react';

type BubbleProps = {
  question: Question;
  currentQuestion: string;
  setCurrentQuestion: Dispatch<SetStateAction<string>>;
  carouselApi: CarouselApi;
};

export const QuestionBubble = ({
  question,
  carouselApi,
  currentQuestion,
  setCurrentQuestion,
}: BubbleProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: question.id });

  const onClick = () => {
    if (!carouselApi) {
      return;
    }

    carouselApi?.scrollTo(question.number - 1);
    setCurrentQuestion(question.id);
  };

  return (
    <span
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={cn(
        `rounded-full border w-6 h-6 text-center hover:bg-primary cursor-pointer overflow-x-auto text-foreground ${currentQuestion === question.id && 'bg-primary dark:text-black'}`
      )}
      onMouseUp={onClick}
    >
      {question.number}
    </span>
  );
};
