import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Choice as ChoiceType } from '@/db/schema/choice';

import { Choice } from './choice';

export type MultiChoiceProps = {
  choice: ChoiceType;
};

export const MultiChoice = ({ choice }: MultiChoiceProps) => {
  return (
    <Choice>
      <Checkbox value={choice.id} id={choice.id} />
      <ScrollArea type="auto" className="h-full w-full">
        <Label
          htmlFor={choice.id}
          className="block w-full h-full p-3 leading-4"
        >
          {choice.text}
        </Label>
      </ScrollArea>
    </Choice>
  );
};
