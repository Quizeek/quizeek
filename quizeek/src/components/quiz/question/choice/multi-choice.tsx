import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Choice as ChoiceType, PublicChoice } from '@/db/schema/choice';
import {
  type QuizAttempt as QuizAttemptType,
  QuizAttemptWithAnswers,
} from '@/db/schema/quiz-attempt';
import { useFormContext } from 'react-hook-form';

import { Choice } from './choice';

export type MultiChoiceProps = {
  questionId: string;
  choice: ChoiceType | PublicChoice;
  attempt: QuizAttemptType | QuizAttemptWithAnswers;
};

export const MultiChoice = ({
  questionId,
  choice,
  attempt,
}: MultiChoiceProps) => {
  const form = useFormContext();

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
      <FormField
        control={form.control}
        name={questionId}
        render={({ field }) => (
          <FormItem className="w-full flex flex-row-reverse items-center gap-2">
            <Label
              htmlFor={choice.id}
              className="block w-full h-full p-3 leading-4"
            >
              {choice.text}
            </Label>
            <FormControl>
              <Checkbox
                id={choice.id}
                disabled={attempt.type === 'with_answers'}
                {...field}
                checked={field.value?.includes(choice.id)}
                onCheckedChange={(checked) => {
                  return checked
                    ? field.onChange([...field.value, choice.id])
                    : field.onChange(
                        field.value?.filter(
                          (value: string) => value !== choice.id
                        )
                      );
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </Choice>
  );
};
