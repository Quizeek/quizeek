import { FormControl } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { Choice as ChoiceType, PublicChoice } from '@/db/schema/choice';
import {
  type QuizAttempt as QuizAttemptType,
  QuizAttemptWithAnswers,
} from '@/db/schema/quiz-attempt';

import { Choice } from './choice';

export type SingleChoiceProps = {
  choice: ChoiceType | PublicChoice;
  attempt: QuizAttemptType | QuizAttemptWithAnswers;
};

export const SingleChoice = ({ choice, attempt }: SingleChoiceProps) => {
  const enableHiglighting =
    attempt.type === 'with_answers' && choice.type === 'private';
  const wasSelected =
    enableHiglighting &&
    !!attempt.answers.find((a) => a.choiceId === choice.id);
  const isCorrect = enableHiglighting && choice.isCorrect;

  return (
    <Choice
      enableHiglighting={enableHiglighting}
      wasSelected={wasSelected}
      isCorrect={isCorrect}
    >
      <FormControl>
        <RadioGroupItem
          value={choice.id}
          id={choice.id}
          disabled={attempt.type === 'with_answers'}
        />
      </FormControl>
      <Label htmlFor={choice.id} className="block w-full h-full p-3 leading-4">
        {choice.text}
      </Label>
    </Choice>
  );
};
