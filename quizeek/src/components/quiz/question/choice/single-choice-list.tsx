import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { RadioGroup } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Choice, PublicChoice } from '@/db/schema/choice';
import {
  type QuizAttempt as QuizAttemptType,
  QuizAttemptWithAnswers,
} from '@/db/schema/quiz-attempt';
import { useFormContext } from 'react-hook-form';

import { SingleChoice } from './single-choice';

export type SingleChoiceListProps = {
  questionId: string;
  choices: (Choice | PublicChoice)[];
  attempt: QuizAttemptType | QuizAttemptWithAnswers;
};

export const SingleChoiceList = ({
  questionId,
  choices,
  attempt,
}: SingleChoiceListProps) => {
  const form = useFormContext();

  return (
    <ScrollArea
      type="auto"
      className="mt-4 flex flex-col max-h-[40vh] overflow-y-auto pr-4"
    >
      <FormField
        control={form.control}
        name={questionId}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                onValueChange={(v) => field.onChange([v])}
                value={field.value?.[0]}
                defaultValue={field.value?.[0]}
              >
                {choices.map((choice) => (
                  <SingleChoice
                    key={choice.id}
                    choice={choice}
                    attempt={attempt}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      ></FormField>
    </ScrollArea>
  );
};
