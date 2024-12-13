import { RadioGroup } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Choice } from '@/db/schema/choice';

import { SingleChoice } from './single-choice';

export type SingleChoiceListProps = {
  choices: Choice[];
};

export const SingleChoiceList = ({ choices }: SingleChoiceListProps) => {
  return (
    <ScrollArea
      type="auto"
      className="mt-4 flex flex-col max-h-[40vh] overflow-y-auto pr-4"
    >
      <RadioGroup>
        {choices.map((choice) => (
          <SingleChoice key={choice.id} choice={choice} />
        ))}
      </RadioGroup>
    </ScrollArea>
  );
};
