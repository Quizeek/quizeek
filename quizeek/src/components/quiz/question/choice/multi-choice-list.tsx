import { ScrollArea } from '@/components/ui/scroll-area';
import { Choice, PublicChoice } from '@/db/schema/choice';
import {
  type QuizAttempt as QuizAttemptType,
  QuizAttemptWithAnswers,
} from '@/db/schema/quiz-attempt';

import { MultiChoice } from './multi-choice';

export type MultiChoiceListProps = {
  questionId: string;
  choices: (Choice | PublicChoice)[];
  attempt: QuizAttemptType | QuizAttemptWithAnswers;
};

export const MultiChoiceList = ({
  questionId,
  choices,
  attempt,
}: MultiChoiceListProps) => {
  return (
    <ScrollArea
      type="auto"
      className="mt-4 flex flex-col max-h-[40vh] overflow-y-auto pr-4"
    >
      {choices.map((choice) => (
        <MultiChoice
          key={choice.id}
          choice={choice}
          questionId={questionId}
          attempt={attempt}
        />
      ))}
    </ScrollArea>
  );
};
